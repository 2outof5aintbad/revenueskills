"use client";

import { useState, useEffect } from "react";
import type { Review } from "@/types/skill";

const STAR_PATH = "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

function Stars({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const filled = Math.round(rating);
  const sz = size === "lg" ? "w-4 h-4" : "w-3 h-3";
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`${sz} fill-current ${i <= filled ? "text-amber-400" : "text-surface-200"}`}
          viewBox="0 0 20 20"
          aria-hidden
        >
          <path d={STAR_PATH} />
        </svg>
      ))}
    </span>
  );
}

function StarPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hovered, setHovered] = useState(0);
  const active = hovered || value;
  const LABELS = ["", "Poor", "Fair", "Good", "Great", "Excellent"];

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={value === i}
            aria-label={`${i} star${i !== 1 ? "s" : ""}`}
            onClick={() => onChange(i)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(0)}
          >
            <svg
              className={`w-6 h-6 fill-current transition-colors ${
                i <= active ? "text-amber-400" : "text-surface-200 hover:text-amber-200"
              }`}
              viewBox="0 0 20 20"
              aria-hidden
            >
              <path d={STAR_PATH} />
            </svg>
          </button>
        ))}
      </div>
      {active > 0 && (
        <span className="text-sm text-ink-400 w-16">{LABELS[active]}</span>
      )}
    </div>
  );
}

function ReviewCard({ review, isNew }: { review: Review; isNew: boolean }) {
  const dateLabel = isNew
    ? "Just now"
    : new Date(review.date).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
      });

  return (
    <div className={`py-5 border-b border-surface-100 last:border-0 ${isNew ? "animate-fade-up" : ""}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Stars rating={review.rating} />
          <span className="text-sm font-medium text-ink-700">{review.author}</span>
          {isNew && (
            <span className="label px-1.5 py-0.5 rounded bg-brand-50 text-brand-600 border border-brand-100">
              You
            </span>
          )}
        </div>
        <span className="text-xs text-ink-300">{dateLabel}</span>
      </div>
      <p className="text-sm text-ink-500 leading-relaxed">{review.text}</p>
    </div>
  );
}

interface FormState { rating: number; text: string }
const EMPTY: FormState = { rating: 0, text: "" };

function WriteReviewForm({ onSubmit }: { onSubmit: (f: FormState) => void }) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  function validate() {
    const next: typeof errors = {};
    if (form.rating === 0) next.rating = "Select a rating.";
    if (form.text.trim().length < 10) next.text = "Review must be at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
    setForm(EMPTY);
    setErrors({});
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4 pt-5 border-t border-surface-100">
      <div>
        <label className="block text-sm font-medium text-ink-700 mb-2">Rating</label>
        <StarPicker
          value={form.rating}
          onChange={(n) => {
            setForm((f) => ({ ...f, rating: n }));
            setErrors((e) => ({ ...e, rating: undefined }));
          }}
        />
        {errors.rating && <p className="mt-1.5 text-xs text-red-500">{errors.rating}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-ink-700 mb-1.5">Review</label>
        <textarea
          rows={4}
          value={form.text}
          onChange={(e) => {
            setForm((f) => ({ ...f, text: e.target.value }));
            setErrors((er) => ({ ...er, text: undefined }));
          }}
          placeholder="What made this skill useful? How did it fit your workflow?"
          className="field resize-none"
        />
        {errors.text && <p className="mt-1 text-xs text-red-500">{errors.text}</p>}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => { setForm(EMPTY); setErrors({}); }}
          className="text-sm text-ink-400 hover:text-ink-700 transition-colors"
        >
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          Submit Review
        </button>
      </div>
    </form>
  );
}

export default function ReviewSection({
  slug,
  initialReviews,
  initialRating,
}: {
  slug: string;
  initialReviews: Review[];
  initialRating: number;
}) {
  const [persistedReviews, setPersistedReviews] = useState<Review[]>([]);
  const [newReviewId, setNewReviewId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/skills/${slug}/reviews`)
      .then((r) => r.json())
      .then((data) => { if (data.reviews) setPersistedReviews(data.reviews); })
      .catch(() => {});
  }, [slug]);

  const allReviews = [...persistedReviews, ...initialReviews];
  const avgRating =
    allReviews.length === 0
      ? initialRating
      : allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length;

  async function handleSubmit(form: FormState) {
    setSubmitError(null);
    try {
      const res = await fetch(`/api/skills/${slug}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating: form.rating, text: form.text.trim(), author: "you" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error ?? "Could not submit review. Please try again.");
        return;
      }
      setPersistedReviews((prev) => [data.review, ...prev]);
      setNewReviewId(data.review.id);
      setShowForm(false);
      setJustSubmitted(true);
      setTimeout(() => setJustSubmitted(false), 3000);
    } catch {
      setSubmitError("Network error — please check your connection and try again.");
    }
  }

  const newIds = newReviewId ? new Set([newReviewId]) : new Set<string>();

  return (
    <section className="mb-10">
      <p className="label mb-5">Reviews</p>

      {/* Aggregate */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl font-semibold text-ink-900 tabular-nums">
            {avgRating.toFixed(1)}
          </span>
          <div>
            <Stars rating={avgRating} size="lg" />
            <p className="text-xs text-ink-400 mt-1">
              {allReviews.length} review{allReviews.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="btn-secondary text-sm"
          >
            Write a Review
          </button>
        )}
      </div>

      {/* Success notice */}
      {justSubmitted && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-surface-100 border border-surface-200 text-ink-600 text-sm mb-5 animate-fade-up">
          <svg className="w-4 h-4 shrink-0 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Review submitted — thank you.
        </div>
      )}

      {/* Submit error */}
      {submitError && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4">
          {submitError}
        </p>
      )}

      {/* Form */}
      {showForm && <WriteReviewForm onSubmit={handleSubmit} />}

      {/* List */}
      <div>
        {allReviews.length > 0 ? (
          allReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              isNew={newIds.has(review.id)}
            />
          ))
        ) : (
          <p className="text-sm text-ink-400 py-4">
            No reviews yet. Be the first to leave one.
          </p>
        )}
      </div>
    </section>
  );
}
