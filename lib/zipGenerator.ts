import JSZip from "jszip";
import { slugify } from "./skillGenerator";

/**
 * Build an in-memory ZIP with this structure:
 *
 *   {skill-slug}/
 *     SKILL.md
 *
 * Returns a Blob suitable for a browser download link.
 * Must only be called in a browser context (`"use client"` component).
 */
export async function generateSkillZip(
  skillMarkdown: string,
  skillName: string
): Promise<Blob> {
  const slug = slugify(skillName);
  const zip = new JSZip();

  const folder = zip.folder(slug);
  if (!folder) throw new Error(`Failed to create folder "${slug}" in ZIP.`);

  folder.file("SKILL.md", skillMarkdown);

  return zip.generateAsync({ type: "blob", compression: "DEFLATE" });
}

/**
 * Trigger a browser file-save dialog for the given Blob.
 * Uses a temporary <a> element — no popup blockers, no page navigation.
 */
export function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // Revoke after a tick so the browser has time to initiate the download
  setTimeout(() => URL.revokeObjectURL(url), 100);
}
