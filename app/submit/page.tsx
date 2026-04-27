import PageHeader from "@/components/PageHeader";

export const metadata = { title: "Submit a Skill — SkillMarket" };

export default function SubmitPage() {
  return (
    <div className="page">
      <div className="max-w-xl">
        <PageHeader
          title="Submit a Skill"
          description="Share a skill with the community. All submissions are reviewed before publishing."
        />

        <form className="space-y-5 pb-16">
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-1.5">
              Skill Name
            </label>
            <input
              type="text"
              placeholder="e.g. Deal Coach"
              className="field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-700 mb-1.5">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="What does this skill do and who is it for?"
              className="field resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-700 mb-1.5">
              Category
            </label>
            <select className="field">
              <option value="">Select a category</option>
              <option value="sales">Sales</option>
              <option value="research">Research</option>
              <option value="productivity">Productivity</option>
              <option value="writing">Writing</option>
              <option value="data">Data &amp; Analytics</option>
              <option value="customer-success">Customer Success</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-700 mb-1.5">
              Skill Definition{" "}
              <span className="font-normal text-ink-400">(SKILL.md)</span>
            </label>
            <textarea
              rows={10}
              placeholder="Paste your SKILL.md content here..."
              className="field resize-none font-mono text-xs"
            />
          </div>

          <button type="submit" className="btn-primary w-full justify-center py-2.5">
            Submit for Review
          </button>
        </form>
      </div>
    </div>
  );
}
