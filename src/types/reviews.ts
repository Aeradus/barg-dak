/**
 * Agent B: Type definitions for Google Places review objects.
 */

/** A single review as returned by the Google Places API (or our mock). */
export interface GoogleReview {
  /** Display name of the reviewer. */
  authorName: string;
  /** URL to the reviewer's Google profile photo. */
  profilePhotoUrl: string;
  /** Numerical star rating (1–5). */
  rating: 1 | 2 | 3 | 4 | 5;
  /** The written review text. */
  text: string;
  /** Human-readable relative time (e.g. "2 weken geleden"). */
  relativeTimeDescription: string;
  /** Unix timestamp (seconds) when the review was submitted. */
  time: number;
}

/** Shape of the API response wrapping the reviews list. */
export interface GoogleReviewsResponse {
  reviews: GoogleReview[];
  /** Overall aggregate rating for the place. */
  aggregateRating: number;
  /** Total number of reviews on the listing. */
  totalReviews: number;
}
