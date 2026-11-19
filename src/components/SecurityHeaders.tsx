"use client";

import { Check, Minus, RefreshCw, X } from "lucide-react";
import { useEffect, useSyncExternalStore, type CSSProperties } from "react";
import { security } from "@/content/security";
import {
  disabledPermissions,
  hstsDays,
  readReport,
  summarizeCsp,
  type HeadersReport,
} from "@/lib/security-headers";

type State =
  | { status: "static" }
  | { status: "loading" }
  | { status: "done"; report: HeadersReport; local: boolean; checkedAt: string; host: string }
  | { status: "error" };

const SERVER_STATE: State = { status: "static" };
let state: State = SERVER_STATE;
const listeners = new Set<() => void>();

function publish(next: State) {
  state = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

const read = () => state;
const readServer = () => SERVER_STATE;

async function check() {
  if (state.status === "loading") return;
  publish({ status: "loading" });
  try {
    const response = await fetch("/", {
      method: "HEAD",
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) {
      publish({ status: "error" });
      return;
    }
    publish({
      status: "done",
      report: readReport(
        (name) => response.headers.get(name),
        security.headers.map((header) => header.name),
        security.hsts.name,
      ),
      local: ["localhost", "127.0.0.1", "[::1]"].includes(location.hostname),
      checkedAt: new Date().toLocaleTimeString("pt-BR"),
      host: location.host,
    });
  } catch {
    publish({ status: "error" });
  }
}

function useHeadersState() {
  const current = useSyncExternalStore(subscribe, read, readServer);
  useEffect(() => {
    if (state.status === "static") void check();
  }, []);
  return current;
}

function panelStatus(current: State): string {
  if (current.status !== "done") return security.status[current.status];
  if (current.report.present === 0) {
    return current.local ? security.status.local : security.status.missing;
  }
  return security.status.active(current.report.present, current.report.total);
}

function HeaderValue({ name, value }: { name: string; value: string }) {
  if (name === "content-security-policy") {
    const csp = summarizeCsp(value);
    return (
      <>
        {security.summary.scripts(csp.scriptHashes)}
        <span className={csp.unsafeInline ? "text-danger" : undefined}>
          {csp.unsafeInline ? security.summary.unsafeScripts : security.summary.safeScripts}
        </span>
        {csp.frameAncestorsNone ? security.summary.frameAncestors : null}
      </>
    );
  }
  if (name === "permissions-policy") {
    return security.summary.permissions(disabledPermissions(value).length);
  }
  if (name === security.hsts.name) {
    const days = hstsDays(value);
    return (
      <>
        {days === null ? value : security.summary.hsts(days)}
        {days !== null && /(?:^|;)\s*includeSubDomains\s*(?:;|$)/i.test(value)
          ? security.summary.subdomains
          : null}
      </>
    );
  }
  return value;
}

function HeaderLine({
  header,
  current,
  index,
}: {
  header: { name: string; explain: string };
  current: State;
  index: number;
}) {
  const hsts = header.name === security.hsts.name;
  const value =
    current.status === "done"
      ? ((hsts ? current.report.hsts.value : current.report.rows[index]?.value) ?? null)
      : null;
  const missing =
    current.status === "done" &&
    value === null &&
    !hsts &&
    !(current.local && current.report.present === 0);
  const tone = value !== null ? "text-accent" : missing ? "text-danger" : "text-muted";
  const Mark = value !== null ? Check : missing ? X : Minus;
  const label =
    value !== null ? security.row.active : missing ? security.row.missing : security.row.unchecked;

  return (
    <div
      className={`grid grid-cols-[1rem_minmax(0,1fr)_auto] gap-x-3 gap-y-1 py-3 ${current.status === "done" ? "check-in" : ""} ${hsts ? "mt-4" : ""}`}
      style={{ "--i": index } as CSSProperties}
    >
      <dt className="col-span-2 grid min-w-0 grid-cols-[1rem_minmax(0,1fr)] items-start gap-x-3">
        <Mark aria-hidden="true" className={`mark mt-1 size-4 ${tone}`} />
        <span translate="no" className="break-all font-mono text-sm text-fg">
          {header.name}
        </span>
      </dt>
      <dd className={`text-sm ${tone}`}>{label}</dd>
      {value !== null ? (
        <dd
          translate="no"
          className="col-span-2 col-start-2 break-words font-mono text-sm text-muted"
        >
          <HeaderValue name={header.name} value={value} />
        </dd>
      ) : hsts && current.status === "done" ? (
        <dd className="col-span-2 col-start-2 text-sm text-muted">
          {security.summary.hstsMissing}
        </dd>
      ) : null}
      <dd className="col-span-2 col-start-2 text-sm text-fg">{header.explain}</dd>
    </div>
  );
}

export function SecurityPanel() {
  const current = useHeadersState();
  const csp =
    current.status === "done"
      ? current.report.rows.find((row) => row.name === "content-security-policy")?.value
      : null;
  const showCommand =
    current.status === "static" || (current.status === "done" && current.report.present === 0);

  return (
    <div data-ui className="bg-bg p-6 sm:p-8">
      <p role="status" className="text-lg font-semibold tabular-nums">
        {panelStatus(current)}
      </p>
      {current.status === "done" ? (
        <p className="mt-2 text-sm text-muted tabular-nums">
          {security.status.source(current.host, current.checkedAt)}
        </p>
      ) : null}
      <dl
        key={current.status === "done" ? current.checkedAt : current.status}
        aria-busy={current.status === "loading"}
        className="mt-4"
      >
        {security.headers.map((header, index) => (
          <HeaderLine key={header.name} header={header} current={current} index={index} />
        ))}
        <HeaderLine header={security.hsts} current={current} index={security.headers.length} />
      </dl>
      {csp ? (
        <details className="mt-4">
          <summary className="inline-flex min-h-11 cursor-pointer items-center font-medium">
            {security.summary.fullCsp}
          </summary>
          <pre
            translate="no"
            className="whitespace-pre-wrap break-all font-mono text-sm text-muted"
          >
            {csp
              .split(";")
              .map((directive) => directive.trim())
              .join(";\n")}
          </pre>
        </details>
      ) : null}
      {showCommand ? (
        <div className="mt-4">
          {current.status === "static" ? (
            <p className="text-sm">{security.status.noScript}</p>
          ) : null}
          <code translate="no" className="block break-all font-mono text-sm text-muted">
            {security.command}
          </code>
        </div>
      ) : null}
    </div>
  );
}

function sealLabel(current: State): string {
  if (current.status !== "done") return security.seal[current.status];
  const { present, total } = current.report;
  return present === 0 && current.local
    ? security.seal.local
    : security.seal.active(present, total);
}

export function SecurityStamp() {
  const current = useHeadersState();
  const complete = current.status === "done" && current.report.present === current.report.total;
  const partial =
    current.status === "done" &&
    current.report.present < current.report.total &&
    !(current.local && current.report.present === 0);
  const stateKey =
    current.status === "done" ? `${current.status}-${current.checkedAt}` : current.status;

  return (
    <div
      className={`border-t-[6px] border-dotted border-surface p-5 md:border-l-[6px] md:border-t-0 ${complete ? "on-stamp bg-stamp text-on-stamp" : "bg-surface-2 text-fg"}`}
    >
      <div key={stateKey} className="stamp-in">
        <p className="text-[length:var(--step-small)] font-semibold">{security.stamp.title}</p>
        <p
          className={`mt-2 text-[length:var(--step-lead)] font-extrabold leading-tight tabular-nums ${partial ? "text-danger" : ""}`}
        >
          {sealLabel(current)}
        </p>
        {current.status === "done" ? (
          <p className="mt-2 text-[length:var(--step-small)]">
            {security.status.source(current.host, current.checkedAt)}
          </p>
        ) : null}
        <a
          href="#seguranca"
          className="mt-1 inline-flex min-h-11 items-center text-[length:var(--step-small)] font-semibold underline underline-offset-4"
        >
          {security.stamp.link}
        </a>
      </div>
    </div>
  );
}

export function SecurityRecheck() {
  const current = useHeadersState();
  if (current.status === "static") return null;

  return (
    <button
      type="button"
      aria-disabled={current.status === "loading"}
      onClick={current.status === "loading" ? undefined : () => void check()}
      style={{ "--i": 3 } as CSSProperties}
      className="inline-flex min-h-[60px] w-full items-center justify-center gap-2 bg-fg px-4 text-[length:var(--step-body)] font-semibold text-bg transition-[transform,opacity] duration-[var(--dur-fast)] ease-[var(--ease-out)] hover:opacity-90 active:scale-[0.98] active:duration-[var(--dur-press)] lg:col-span-5 lg:col-start-8 lg:row-start-4 lg:min-h-[72px] lg:self-end"
    >
      <RefreshCw aria-hidden="true" className="size-4" />
      {current.status === "loading" ? security.button.loading : security.button.check}
    </button>
  );
}

export function SecuritySeal() {
  const current = useHeadersState();
  let tone = "bg-muted";
  if (current.status === "done" && !(current.report.present === 0 && current.local)) {
    const { present, total } = current.report;
    tone = present === total ? "bg-accent" : "bg-danger";
  }

  return (
    <a
      href="#seguranca"
      className="group inline-flex min-h-11 items-center gap-2 text-[length:var(--step-small)] text-muted transition-colors duration-[var(--dur-fast)] hover:text-fg"
    >
      <span aria-hidden="true" className={`size-2 shrink-0 rounded-full ${tone}`} />
      <span className="tabular-nums">{sealLabel(current)}</span>
    </a>
  );
}
