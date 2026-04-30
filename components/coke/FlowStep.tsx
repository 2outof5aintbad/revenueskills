interface FlowStepProps {
  index: number;
  total: number;
  time?: string;
  step?: string;
  actor?: string;
  agent?: string;
  title?: string;
  action?: string;
  description?: string;
  system?: string;
  friction?: string | null;
  delta?: string;
  autonomous?: boolean;
  note?: string | null;
}

export default function FlowStep({
  index,
  total,
  time,
  step,
  actor,
  agent,
  title,
  action,
  description,
  system,
  friction,
  delta,
  autonomous,
  note,
}: FlowStepProps) {
  const isLast = index === total - 1;
  const hasFriction = friction != null;
  const isDelta = delta != null;
  const isAgentStep = agent != null;

  return (
    <div className="flex gap-5">
      {/* Timeline spine */}
      <div className="flex flex-col items-center shrink-0">
        <div
          className={`w-9 h-9 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 ${
            isAgentStep && autonomous === false
              ? "border-amber-400/40 bg-amber-400/8 text-amber-400"
              : isAgentStep
              ? "border-[#E61E2B]/40 bg-[#E61E2B]/8 text-[#E61E2B]"
              : hasFriction
              ? "border-amber-400/40 bg-amber-400/8 text-amber-400"
              : "border-white/12 bg-white/[0.04] text-white/50"
          }`}
        >
          {step || String(index + 1).padStart(2, "0")}
        </div>
        {!isLast && (
          <div className="w-px flex-1 mt-2 bg-white/6 min-h-[2rem]" />
        )}
      </div>

      {/* Content */}
      <div className="pb-10 flex-1">
        {/* Header row */}
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
          {time && (
            <span className="text-xs font-mono font-bold text-white/30 tabular-nums">{time}</span>
          )}
          {agent && (
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#E61E2B]/70 px-2 py-0.5 rounded-md border border-[#E61E2B]/20 bg-[#E61E2B]/5">
              {agent}
            </span>
          )}
          {actor && !agent && (
            <span className="text-[10px] font-bold tracking-widest uppercase text-white/30">
              {actor}
            </span>
          )}
          {autonomous != null && (
            <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-md border ${
              autonomous
                ? "text-emerald-400/70 border-emerald-400/20 bg-emerald-400/5"
                : "text-amber-400/70 border-amber-400/20 bg-amber-400/5"
            }`}>
              {autonomous ? "Autonomous" : "Human Review"}
            </span>
          )}
        </div>

        {title && (
          <h4 className="text-base font-bold text-white mb-1.5">{title}</h4>
        )}

        <p className="text-sm text-white/55 leading-relaxed">
          {action || description}
        </p>

        {system && (
          <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-white/30 bg-white/[0.04] border border-white/8 rounded-md px-2.5 py-1">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
              <rect x="1" y="1" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1"/>
            </svg>
            {system}
          </div>
        )}

        {hasFriction && (
          <div className="mt-3 flex items-start gap-2 text-[11px] text-amber-400/70 bg-amber-400/5 border border-amber-400/10 rounded-lg px-3 py-2">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0 mt-0.5" aria-hidden>
              <path d="M6 1L11 10H1L6 1Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
              <path d="M6 5v2.5M6 9h.01" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
            </svg>
            {friction}
          </div>
        )}

        {isDelta && (
          <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-400/5 border border-emerald-400/10 rounded-lg px-3 py-2">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="shrink-0" aria-hidden>
              <path d="M5 8V2M2.5 4.5L5 2l2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {delta}
          </div>
        )}

        {note && (
          <p className="mt-2 text-[11px] text-white/25 italic">{note}</p>
        )}
      </div>
    </div>
  );
}
