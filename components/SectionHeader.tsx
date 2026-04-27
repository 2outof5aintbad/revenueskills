import Link from "next/link";

interface Props {
  title: string;
  description?: string;
  href?: string;
  hrefLabel?: string;
}

export default function SectionHeader({ title, description, href, hrefLabel = "View all" }: Props) {
  return (
    <div className="flex items-baseline justify-between mb-6">
      <div>
        <h2 className="text-base font-semibold text-ink-900">{title}</h2>
        {description && (
          <p className="text-sm text-ink-400 mt-0.5">{description}</p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="text-sm text-ink-400 hover:text-ink-700 transition-colors shrink-0"
        >
          {hrefLabel}
        </Link>
      )}
    </div>
  );
}
