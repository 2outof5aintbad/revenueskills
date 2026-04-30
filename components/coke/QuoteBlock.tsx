interface QuoteBlockProps {
  text: string;
  attribution?: string;
  variant?: "default" | "accent";
}

export default function QuoteBlock({ text, attribution, variant = "default" }: QuoteBlockProps) {
  const isAccent = variant === "accent";

  return (
    <blockquote
      className={`relative rounded-2xl px-8 py-7 ${
        isAccent
          ? "bg-[#E61E2B]/8 border border-[#E61E2B]/15"
          : "bg-white/[0.04] border border-white/8"
      }`}
    >
      <span
        aria-hidden
        className={`absolute top-4 left-6 text-5xl leading-none font-serif select-none ${
          isAccent ? "text-[#E61E2B]/20" : "text-white/10"
        }`}
      >
        &ldquo;
      </span>
      <p className="relative text-lg font-medium leading-relaxed text-white/80 pl-4">
        {text}
      </p>
      {attribution && (
        <p className="mt-4 text-xs font-semibold tracking-wide text-white/30 pl-4">
          — {attribution}
        </p>
      )}
    </blockquote>
  );
}
