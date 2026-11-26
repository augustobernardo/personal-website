"use client";

import { Check, Minus, RefreshCw, Shield, ShieldAlert, ShieldCheck, X } from "lucide-react";
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
  if (current.report.received === 0) {
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
        <span className={csp.unsafeInline ? "bg-bad on-fill px-1 font-bold" : undefined}>
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
    !(current.local && current.report.received === 0);
  const secure =
    current.status === "done" &&
    (hsts ? current.report.hsts.secure : (current.report.rows[index]?.secure ?? false));
  const bad = missing || (value !== null && !secure);
  const fill = secure ? "bg-ok" : bad ? "bg-bad" : "bg-white";
  const Mark = secure ? Check : bad ? X : Minus;
  const label = secure
    ? security.row.active
    : value !== null
      ? security.row.insecure
      : missing
        ? security.row.missing
        : security.row.unchecked;

  return (
    <div
      className={`grid grid-cols-1 items-start gap-x-3 gap-y-2 py-4 sm:grid-cols-[minmax(0,1fr)_auto] ${current.status === "done" ? "check-in" : ""} ${hsts ? "mt-0 border-t-3 border-line" : ""}`}
      style={{ "--i": index } as CSSProperties}
    >
      <dt
        translate="no"
        className="min-w-0 [overflow-wrap:anywhere] font-mono text-[0.875rem] font-bold"
      >
        {header.name}
      </dt>
      <dd
        className={`nb-sticker on-fill justify-self-start !shadow-none px-2.5 py-1 sm:justify-self-auto ${fill}`}
      >
        <Mark aria-hidden="true" strokeWidth={3} className="mark size-4" />
        {label}
      </dd>
      {value !== null ? (
        <dd
          translate="no"
          className="sm:col-span-2 break-words font-mono text-[0.875rem] text-muted"
        >
          <HeaderValue name={header.name} value={value} />
        </dd>
      ) : hsts && current.status === "done" ? (
        <dd className="sm:col-span-2 text-[0.875rem] text-muted">{security.summary.hstsMissing}</dd>
      ) : null}
      <dd className="sm:col-span-2 text-[length:var(--step-body)]">{header.explain}</dd>
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
    current.status === "static" || (current.status === "done" && current.report.received === 0);

  return (
    <div
      data-ui
      className="on-panel rounded-nb border-3 border-line bg-surface p-5 text-fg shadow-[8px_8px_0_0_var(--pop-blue)] sm:p-8"
    >
      <p role="status" className="type-title tabular-nums">
        {panelStatus(current)}
      </p>
      {current.status === "done" ? (
        <p className="mt-2 text-[0.875rem] text-muted tabular-nums">
          {security.status.source(current.host, current.checkedAt)}
        </p>
      ) : null}
      <dl
        key={current.status === "done" ? current.checkedAt : current.status}
        aria-busy={current.status === "loading"}
        className="mt-6 divide-y-2 divide-line"
      >
        {security.headers.map((header, index) => (
          <HeaderLine key={header.name} header={header} current={current} index={index} />
        ))}
        <HeaderLine header={security.hsts} current={current} index={security.headers.length} />
      </dl>
      {csp ? (
        <details>
          <summary className="nb-btn nb-btn--secondary mt-6 min-h-11 [&::-webkit-details-marker]:hidden">
            {security.summary.fullCsp}
          </summary>
          <pre
            translate="no"
            className="mt-4 whitespace-pre-wrap break-all rounded-nb border-2 border-line bg-bg p-4 font-mono text-[0.875rem]"
          >
            {csp
              .split(";")
              .map((directive) => directive.trim())
              .join(";\n")}
          </pre>
        </details>
      ) : null}
      {showCommand ? (
        <div className="mt-6">
          {current.status === "static" ? (
            <p className="mb-2 text-[0.875rem]">{security.status.noScript}</p>
          ) : null}
          <code translate="no" className="nb-chip block h-auto w-fit break-all py-1">
            {security.command}
          </code>
        </div>
      ) : null}
    </div>
  );
}

function sealLabel(current: State): string {
  if (current.status !== "done") return security.seal[current.status];
  const { present, received, total } = current.report;
  return received === 0 && current.local
    ? security.seal.local
    : security.seal.active(present, total);
}

export function SecurityStamp() {
  const current = useHeadersState();
  const complete = current.status === "done" && current.report.present === current.report.total;
  const partial =
    current.status === "done" &&
    current.report.present < current.report.total &&
    !(current.local && current.report.received === 0);
  // Static, loading and error share one element so the lift transitions; only a real result remounts and slaps.
  const stateKey = current.status === "done" ? `done-${current.checkedAt}` : "idle";

  const fill = complete ? "bg-ok on-fill" : partial ? "bg-warn on-fill" : "bg-surface text-fg";
  const Icon = complete ? ShieldCheck : partial ? ShieldAlert : Shield;

  return (
    <div
      key={stateKey}
      data-state={current.status}
      className={`stamp ${current.status === "done" ? "stamp-in" : ""} relative w-full max-w-[22rem] rotate-[-2.5deg] rounded-nb border-3 border-line p-5 shadow-hard-lg ${fill}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-2 rounded-[0.25rem] border-2 border-dashed border-current opacity-60"
      />
      <Icon
        aria-hidden="true"
        strokeWidth={2.5}
        className="stamp-icon absolute right-4 top-4 size-8"
      />
      <div className="relative">
        <p className="pr-10 text-[0.875rem] font-bold">{security.stamp.title}</p>
        <p className="type-title mt-3 tabular-nums">{sealLabel(current)}</p>
        {current.status === "done" ? (
          <p className="mt-2 text-[0.875rem]">
            {security.status.source(current.host, current.checkedAt)}
          </p>
        ) : null}
        <a
          href="#seguranca"
          className="mt-2 inline-flex min-h-11 items-center font-bold underline decoration-2 underline-offset-4"
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
      className="nb-btn nb-btn--primary min-h-14 w-full text-[1.125rem] lg:col-span-7 lg:col-start-6 lg:row-start-2 lg:w-auto lg:justify-self-start"
    >
      <RefreshCw
        aria-hidden="true"
        className={`size-4 ${current.status === "loading" ? "motion-safe:animate-spin" : ""}`}
      />
      {current.status === "loading" ? security.button.loading : security.button.check}
    </button>
  );
}

export function SecuritySeal() {
  const current = useHeadersState();
  let tone = "bg-transparent";
  if (current.status === "done" && !(current.report.received === 0 && current.local)) {
    const { present, total } = current.report;
    tone = present === total ? "bg-ok" : "bg-bad";
  }

  return (
    <a
      href="#seguranca"
      className="inline-flex min-h-11 items-center gap-2 font-bold text-current underline-offset-4 hover:underline"
    >
      <span aria-hidden="true" className={`size-3 shrink-0 border-2 border-current ${tone}`} />
      <span className="tabular-nums">{sealLabel(current)}</span>
    </a>
  );
}
