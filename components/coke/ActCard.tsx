import Link from "next/link";

interface ActCardProps {
  number: string;
  title: string;
  tagline: string;
  description: string;
  href: string;
}

export default function ActCard({ number, title, tagline, description, href }: ActCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col p-8 rounded-2xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/14 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Act number */}
      <p className="text-[0.65rem] font-bold tracking-[0.22em] uppercase text-[#E61E2B] mb-6">
        Act {number}
      </p>

      {/* Decorative number */}
      <span className="absolute top-6 right-7 text-7xl font-black text-white/[0.04] leading-none select-none group-hover:text-white/[0.06] transition-colors">
        {number}
      </span>

      <h3 className="text-xl font-bold text-white mb-2 leading-tight">{title}</h3>
      <p className="text-sm font-medium text-[#E61E2B]/70 mb-4">{tagline}</p>
      <p className="text-sm text-white/45 leading-relaxed flex-1">{description}</p>

      <div className="mt-7 flex items-center gap-2 text-xs font-semibold text-white/30 group-hover:text-white/60 transition-colors">
        Enter this act
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className="translate-x-0 group-hover:translate-x-0.5 transition-transform">
          <path d="M2.5 6h7M6.5 2.5L10 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </Link>
  );
}
