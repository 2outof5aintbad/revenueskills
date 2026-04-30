export default function CokeGatePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="w-12 h-12 rounded-xl bg-[#E61E2B]/10 border border-[#E61E2B]/20 flex items-center justify-center mx-auto mb-8">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <rect x="4" y="9" width="12" height="9" rx="2" stroke="#E61E2B" strokeWidth="1.5"/>
            <path d="M7 9V6a3 3 0 0 1 6 0v3" stroke="#E61E2B" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-white mb-3 tracking-tight">
          Access Required
        </h1>
        <p className="text-sm text-white/40 leading-relaxed">
          This briefing is shared via a private link. If you were sent a link and are seeing this page, please use the original URL you received.
        </p>

        <div className="mt-10 pt-8 border-t border-white/6">
          <p className="text-xs text-white/20">
            The Agentic Enterprise · Executive Briefing
          </p>
        </div>
      </div>
    </div>
  );
}
