interface Props {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export default function PageHeader({ title, description, children }: Props) {
  return (
    <div className="pt-12 pb-8 border-b border-surface-100 mb-10">
      <h1 className="text-2xl font-semibold text-ink-900 mb-1">{title}</h1>
      {description && (
        <p className="text-sm text-ink-400">{description}</p>
      )}
      {children}
    </div>
  );
}
