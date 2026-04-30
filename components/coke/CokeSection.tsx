interface CokeSectionProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  divide?: boolean;
}

export default function CokeSection({
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
  divide = false,
}: CokeSectionProps) {
  return (
    <section className={`max-w-6xl mx-auto px-6 py-20 ${divide ? "border-t border-white/6" : ""} ${className}`}>
      {(eyebrow || title || subtitle) && (
        <div className="mb-12">
          {eyebrow && (
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#E61E2B] mb-3">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="text-4xl font-bold tracking-tight text-white mb-4 max-w-2xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-base text-white/50 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
