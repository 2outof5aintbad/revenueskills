"use client";

interface Props {
  skillMarkdown: string;
  skillName: string;
}

export default function PreviewInClaudeButton({ skillMarkdown, skillName }: Props) {
  const message = `I'd like to preview this Claude skill called "${skillName}". Here's the SKILL.md:\n\n${skillMarkdown}\n\nPlease read the skill definition above and then ask me for the input you need to run it.`;
  const url = `https://claude.ai/new?q=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-secondary w-full flex items-center justify-center gap-2"
    >
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
      Preview in Claude
    </a>
  );
}
