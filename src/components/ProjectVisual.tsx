import { ArrowRight, Check, Eye, Play, RotateCcw } from "lucide-react";
import type { CSSProperties } from "react";
import type { ProjectVisualData } from "@/content/types";

const AUDIO_BARS = [
  8, 12, 6, 16, 20, 12, 24, 16, 8, 20, 12, 6, 16, 24, 12, 20, 8, 16, 12, 24, 16, 8, 12, 6,
];
const VERDICT_TONES = {
  pass: { icon: Check, className: "bg-ok" },
  fail: { icon: RotateCcw, className: "bg-bad" },
  warn: { icon: Eye, className: "bg-warn" },
};
const VERDICT_ROTATIONS = ["-rotate-2", "rotate-[1.5deg]", "-rotate-1"];

function ChatVisual({ visual }: { visual: Extract<ProjectVisualData, { kind: "chat" }> }) {
  return (
    <div className="rounded-nb border-3 border-line bg-surface shadow-hard">
      <div className="flex items-center gap-3 border-b-3 border-line px-4 py-3">
        <span
          aria-hidden="true"
          className="on-fill flex size-9 shrink-0 items-center justify-center rounded-md border-2 border-line bg-pop-blue font-mono font-bold"
        >
          {visual.title.slice(0, 1)}
        </span>
        <div>
          <p className="text-sm font-semibold">{visual.title}</p>
          <p className="text-sm text-muted">bot</p>
        </div>
      </div>
      <ol aria-label="Conversa de exemplo" className="in-seq flex flex-col gap-3 p-4">
        {visual.messages.map((message, index) => (
          <li
            key={index}
            style={{ "--i": index } as CSSProperties}
            className={`max-w-[85%] rounded-[0.875rem] border-2 border-line px-3 py-2 text-[0.9375rem] leading-normal break-words ${message.from === "user" ? "self-end rounded-br-sm bg-chat-out" : "self-start rounded-bl-sm bg-bg"}`}
          >
            <span className="sr-only">{message.from === "user" ? "Você: " : "Bot: "}</span>
            {message.text}
            {message.audioSeconds !== undefined && (
              <>
                <span className="sr-only">
                  Mensagem de áudio de {message.audioSeconds} segundos
                </span>
                <span aria-hidden="true" className="inline-flex max-w-full items-center gap-2">
                  <Play aria-hidden="true" className="size-4 shrink-0" strokeWidth={2.5} />
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 96 24"
                    fill="currentColor"
                    className="h-6 w-24 min-w-0 text-fg"
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
    </div>
  );
}

function VerdictsVisual({ visual }: { visual: Extract<ProjectVisualData, { kind: "verdicts" }> }) {
  return (
    <>
      <p className="text-sm text-muted">{visual.intro}</p>
      <ul className="mt-4 flex flex-wrap gap-3">
        {visual.verdicts.map(({ label, tone }, index) => {
          const { icon: Icon, className } = VERDICT_TONES[tone];
          return (
            <li
              key={label}
              className={`nb-sticker on-fill min-h-11 text-[1.125rem] ${VERDICT_ROTATIONS[index % VERDICT_ROTATIONS.length]} ${className}`}
            >
              <Icon aria-hidden="true" className="size-5" strokeWidth={2.5} />
              {label}
            </li>
          );
        })}
      </ul>
      <dl className="mt-8 grid gap-3 sm:grid-cols-3">
        {visual.stats.map(({ value, label }) => (
          <div key={label} className="flex flex-col rounded-nb border-3 border-line bg-surface p-4">
            <dt className="text-sm text-muted">{label}</dt>
            <dd className="order-first type-title tabular-nums">{value}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

function FlowVisual({ visual }: { visual: Extract<ProjectVisualData, { kind: "flow" }> }) {
  return (
    <>
      <ol className="in-seq flex flex-col gap-4">
        {visual.steps.map(({ event, results }, index) => (
          <li
            key={event}
            style={{ "--i": index } as CSSProperties}
            className="grid gap-2 sm:grid-cols-[minmax(0,11rem)_auto_minmax(0,1fr)] sm:items-center"
          >
            <span className="text-sm font-bold">{event}</span>
            <ArrowRight aria-hidden="true" className="hidden size-5 sm:block" strokeWidth={2.5} />
            <ul className="flex min-w-0 flex-wrap gap-2">
              {results.map((result) => (
                <li key={result} translate="no" className="nb-chip max-w-full break-words">
                  {result}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <p className="mt-5 text-[0.875rem] text-muted">{visual.note}</p>
    </>
  );
}

export function ProjectVisual({ visual, name }: { visual: ProjectVisualData; name: string }) {
  return (
    <figure aria-label={name}>
      <div data-ui>
        {visual.kind === "chat" && <ChatVisual visual={visual} />}
        {visual.kind === "verdicts" && <VerdictsVisual visual={visual} />}
        {visual.kind === "flow" && <FlowVisual visual={visual} />}
      </div>
      <figcaption className="mt-4 text-[0.875rem] text-muted">{visual.caption}</figcaption>
    </figure>
  );
}
