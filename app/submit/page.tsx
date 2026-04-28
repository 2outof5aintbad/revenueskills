"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import SubmitForm, { EMPTY_FORM, type FormState } from "@/components/SubmitForm";
import SkillPreview from "@/components/SkillPreview";

export default function SubmitPage() {
  const [formData, setFormData] = useState<FormState>(EMPTY_FORM);

  return (
    <div className="page">
      <PageHeader
        title="Submit a Skill"
        description="Share a skill with the community. All submissions are reviewed before publishing."
      />

      <div className="flex flex-col lg:flex-row gap-10 pb-16">
        {/* Form */}
        <div className="flex-1 min-w-0">
          <SubmitForm onFormChange={setFormData} />
        </div>

        {/* Live preview */}
        <div className="lg:w-[420px] shrink-0">
          <div className="sticky top-20">
            <p className="text-xs font-medium text-ink-400 uppercase tracking-widest mb-3">
              Live Preview
            </p>
            <div className="rounded-xl border border-surface-200 overflow-hidden h-[calc(100vh-10rem)]">
              <SkillPreview data={formData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
