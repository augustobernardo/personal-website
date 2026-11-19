import { ArrowRight, Check, Eye, Play, RotateCcw } from "lucide-react";
import type { ProjectVisualData } from "@/content/types";

const AUDIO_BARS = [
  8, 12, 6, 16, 20, 12, 24, 16, 8, 20, 12, 6, 16, 24, 12, 20, 8, 16, 12, 24, 16, 8, 12, 6,
];
const VERDICT_TONES = {
  pass: { icon: Check, className: "text-accent" },
  fail: { icon: RotateCcw, className: "text-danger" },
  warn: { icon: Eye, className: "text-warn" },
};

function ChatVisual({ visual }: { visual: Extract<ProjectVisualData, { kind: "chat" }> }) {
  return (
    <>
      <div className="mb-4 flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent"
        >
          {visual.title.slice(0, 1)}
        </span>
        <div>
          <p className="text-sm font-semibold">{visual.title}</p>
          <p className="text-sm text-muted">bot</p>
        </div>
      </div>
      <ol aria-label="Conversa de exemplo" className="flex flex-col gap-2">
        {visual.messages.map((message, index) => (
          <li
            key={index}
            className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-normal break-words ${message.from === "user" ? "self-end bg-chat-out" : "self-start bg-surface-2"}`}
          >
            <span className="sr-only">{message.from === "user" ? "Você: " : "Bot: "}</span>
            {message.text}
            {message.audioSeconds !== undefined && (
              <>
                <span className="sr-only">
                  Mensagem de áudio de {message.audioSeconds} segundos
                </span>
                <span aria-hidden="true" className="inline-flex max-w-full items-center gap-2">
                  <Play aria-hidden="true" className="size-4 shrink-0" />
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 96 24"
                    fill="currentColor"
                    className="h-6 w-24 min-w-0 text-muted"
                  >
                    {AUDIO_BARS.map((height, bar) => (
                      <rect key={bar} x={bar * 4} y={(24 - height) / 2} width="2" height={height} />
                    ))}
                  </svg>
                  <span className="shrink-0 tabular-nums">
                    {Math.floor(message.audioSeconds / 60)}:
                    {String(message.audioSeconds % 60).padStart(2, "0")}
                  </span>
                </span>
              </>
            )}
          </li>
        ))}
      </ol>
    </>
  );
}

function VerdictsVisual({ visual }: { visual: Extract<ProjectVisualData, { kind: "verdicts" }> }) {
  return (
    <>
      <p className="text-sm text-muted">{visual.intro}</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {visual.verdicts.map(({ label, tone }) => {
          const { icon: Icon, className } = VERDICT_TONES[tone];
          return (
            <li
              key={label}
              className={`inline-flex min-h-11 items-center gap-2 rounded bg-surface-2 px-4 text-xl font-semibold ${className}`}
            >
              <Icon aria-hidden="true" className="size-5" />
              {label}
            </li>
          );
        })}
      </ul>
      <dl className="mt-6 grid gap-4 sm:grid-cols-3">
        {visual.stats.map(({ value, label }) => (
          <div key={label} className="flex flex-col">
            <dt className="text-sm text-muted">{label}</dt>
            <dd className="order-first text-2xl font-semibold tabular-nums">{value}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

function FlowVisual({ visual }: { visual: Extract<ProjectVisualData, { kind: "flow" }> }) {
  return (
    <>
      <ol className="flex flex-col gap-3">
        {visual.steps.map(({ event, results }) => (
          <li
            key={event}
            className="grid gap-2 sm:grid-cols-[minmax(0,11rem)_auto_minmax(0,1fr)] sm:items-center"
          >
            <span className="text-sm font-medium">{event}</span>
            <ArrowRight aria-hidden="true" className="hidden size-4 text-muted sm:block" />
            <ul className="flex min-w-0 flex-wrap gap-2">
              {results.map((result) => (
                <li
                  key={result}
                  translate="no"
                  className="max-w-full rounded bg-surface-2 px-2 py-1 font-mono text-sm break-words"
                >
                  {result}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-sm text-muted">{visual.note}</p>
    </>
  );
}

export function ProjectVisual({ visual, name }: { visual: ProjectVisualData; name: string }) {
  return (
    <figure aria-label={name}>
      <div data-ui className="rounded bg-surface p-5 sm:p-6">
        {visual.kind === "chat" && <ChatVisual visual={visual} />}
        {visual.kind === "verdicts" && <VerdictsVisual visual={visual} />}
        {visual.kind === "flow" && <FlowVisual visual={visual} />}
      </div>
      <figcaption className="mt-3 text-sm text-muted">{visual.caption}</figcaption>
    </figure>
  );
}
