/**
 * Agent C: Google Reviews grid section.
 * Consumes useGoogleReviews hook from Agent B — no direct fetch calls.
 */

import { useGoogleReviews } from "../hooks/useGoogleReviews";
import { useLanguage } from "../i18n/language";
import type { GoogleReview } from "../types/reviews";

const COPY = {
  nl: {
    sectionAria: "Klantbeoordelingen",
    starsLabel: "van 5 sterren",
    profileAlt: "Profielfoto van",
    badge: "oogle Reviews — Geverifieerd",
    eyebrow: "Klantbeoordelingen",
    heading: "Wat onze klanten zeggen",
    basedOn: " / 5 — gebaseerd op ",
    reviewsSuffix: " Google reviews",
    loadError: "Reviews konden niet worden geladen. Probeer het later opnieuw.",
  },
  en: {
    sectionAria: "Customer reviews",
    starsLabel: "out of 5 stars",
    profileAlt: "Profile photo of",
    badge: "oogle Reviews — Verified",
    eyebrow: "Customer Reviews",
    heading: "What our customers say",
    basedOn: " / 5 — based on ",
    reviewsSuffix: " Google reviews",
    loadError: "Reviews could not be loaded. Please try again later.",
  },
} as const;

function StarRating({
  rating,
  language,
}: {
  rating: number;
  language: "nl" | "en";
}): React.ReactElement {
  const copy = COPY[language];

  return (
    <div className="flex gap-0.5" aria-label={`${rating} ${copy.starsLabel}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`size-4 ${i < rating ? "text-orange-400" : "text-slate-700"}`}
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
            clipRule="evenodd"
          />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({
  review,
  language,
}: {
  review: GoogleReview;
  language: "nl" | "en";
}): React.ReactElement {
  const copy = COPY[language];
  const initials = review.authorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const hasProfilePhoto = review.profilePhotoUrl.trim().length > 0;

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6">
      <StarRating rating={review.rating} language={language} />
      <p className="flex-1 text-sm leading-relaxed text-slate-300">
        {review.text}
      </p>
      <div className="flex items-center gap-3">
        {hasProfilePhoto ? (
          <img
            src={review.profilePhotoUrl}
            alt={`${copy.profileAlt} ${review.authorName}`}
            className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-slate-700"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-xs font-bold text-orange-400"
            aria-hidden="true"
          >
            {initials}
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-white">
            {review.authorName}
          </p>
          <p className="text-xs text-slate-500">
            {review.relativeTimeDescription}
          </p>
        </div>
      </div>
    </article>
  );
}

function GoogleBadge({
  language,
}: {
  language: "nl" | "en";
}): React.ReactElement {
  const copy = COPY[language];

  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-400">
      <span className="font-black text-blue-400">G</span>
      {copy.badge}
    </div>
  );
}

function SkeletonCards(): React.ReactElement {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }, (_, i) => (
        <div
          key={i}
          className="h-52 animate-pulse rounded-2xl bg-slate-800/50"
        />
      ))}
    </div>
  );
}

export default function ReviewsSection(): React.ReactElement {
  const { language } = useLanguage();
  const copy = COPY[language];
  const { data, isPending, isError } = useGoogleReviews(language);

  return (
    <section
      id="reviews"
      aria-label={copy.sectionAria}
      className="bg-slate-900 px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 flex justify-center">
            <GoogleBadge language={language} />
          </div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-orange-500">
            {copy.eyebrow}
          </p>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            {copy.heading}
          </h2>
          {data && (
            <p className="mt-4 text-slate-400">
              <span className="font-bold text-white">
                {data.aggregateRating}
              </span>
              {copy.basedOn}
              <span className="font-bold text-white">{data.totalReviews}</span>
              {copy.reviewsSuffix}
            </p>
          )}
        </div>

        {/* States */}
        {isPending && <SkeletonCards />}

        {isError && (
          <p className="text-center text-slate-400">{copy.loadError}</p>
        )}

        {data && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.reviews.map((review) => (
              <ReviewCard
                key={`${review.authorName}-${review.time}`}
                review={review}
                language={language}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
