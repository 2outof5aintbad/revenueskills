import Link from "next/link";

export default function DeniedPage() {
  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm text-center space-y-4">
        <div className="w-12 h-12 rounded-xl bg-navy-900 flex items-center justify-center mx-auto">
          <span className="text-white text-xl">⚡</span>
        </div>
        <div>
          <h1 className="text-xl font-bold text-navy-900">Salesforce employees only</h1>
          <p className="text-sm text-ink-400 mt-2 leading-relaxed">
            RevenueSkills is available to Salesforce employees. Sign in with your <span className="font-medium text-ink-700">@salesforce.com</span> email address.
          </p>
        </div>
        <Link href="/login" className="btn-primary inline-flex justify-center py-2.5">
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
