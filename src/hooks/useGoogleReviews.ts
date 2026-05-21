/**
 * Agent B: TanStack Query v5 hook for fetching Google Reviews.
 *
 * In development the fetcher returns a realistic mock so we never hit
 * live API rate limits. Swap `fetchReviews` for a real Places API call
 * before going to production.
 */

import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";
import type { GoogleReview, GoogleReviewsResponse } from "../types/reviews";
import aadImg from "../assets/aad.png";
import stefanieImg from "../assets/stefanie.png";
import sylImg from "../assets/syl.png";
import type { Language } from "../i18n/language";

// ---------------------------------------------------------------------------
// Query key factory — keeps keys consistent across the codebase
// ---------------------------------------------------------------------------

export const reviewQueryKeys = {
  all: ["reviews"] as const,
  list: () => [...reviewQueryKeys.all, "list"] as const,
} as const;

// ---------------------------------------------------------------------------
// Mock data for local development
// ---------------------------------------------------------------------------

const REVIEWS_NL: GoogleReview[] = [
  {
    authorName: "Stephanie Roos",
    profilePhotoUrl: stefanieImg,
    rating: 5,
    text:
      "Gister laat op de avond appte ik Marcel omdat we een lekkage in de badkamer hadden. " +
      "Hij en zijn team stonden de volgende ochtend om 8:00 al op de stoep. Ongelooflijk goede en snelle service. " +
      "De dakgoot zat verstopt, dus gelukkig bleef de schade beperkt. " +
      "Nogmaals bedankt Marcel voor de topservice, echt een aanrader!",
    relativeTimeDescription: "5 years ago",
    time: 1620000000,
  },
  {
    authorName: "Jos",
    profilePhotoUrl: "https://lh3.googleusercontent.com/a/default-user=s128",
    rating: 5,
    text:
      "Zeer klantvriendelijk en deskundig. Hij vond snel de oorzaak van de lekkage en heeft het keurig gerepareerd. " +
      "Hij denkt echt mee en kijkt verder dan alleen het directe probleem. " +
      "Ook qua planning was hij erg behulpzaam. Al met al een geweldige ervaring.",
    relativeTimeDescription: "3 years ago",
    time: 1683936000,
  },
  {
    authorName: "Aad Scholten",
    profilePhotoUrl: aadImg,
    rating: 5,
    text:
      "Om 8:00 een lekkage gemeld en dezelfde dag nog opgelost. " +
      "Vakkundig en met passie voor het werk. Zeer aanbevolen.",
    relativeTimeDescription: "3 years ago",
    time: 1683936001,
  },
  {
    authorName: "Laura Naaktgeboren",
    profilePhotoUrl: "https://lh3.googleusercontent.com/a/default-user=s128",
    rating: 5,
    text:
      "Vanmorgen gebeld en dezelfde dag nog langsgekomen om het probleem te bekijken. " +
      "Ik ben uitstekend geholpen!",
    relativeTimeDescription: "5 years ago",
    time: 1620000001,
  },
  {
    authorName: "Syl Bargmans",
    profilePhotoUrl: sylImg,
    rating: 5,
    text: "De beste die er is!!!!",
    relativeTimeDescription: "11 maanden geleden",
    time: 1748736000,
  },
];

const REVIEWS_EN: GoogleReview[] = [
  {
    authorName: "Stephanie Roos",
    profilePhotoUrl: stefanieImg,
    rating: 5,
    text:
      "Late yesterday evening, I texted Marcel because we had a leak in our bathroom. " +
      "He and his team were there the next morning at 8:00 AM. Incredibly good and fast service. " +
      "The gutter was clogged, so thankfully the damage wasn't too bad. " +
      "Thanks again, Marcel, for the excellent and fast service! I recommend him to everyone!",
    relativeTimeDescription: "5 jaar geleden",
    time: 1620000000,
  },
  {
    authorName: "Jos",
    profilePhotoUrl: "https://lh3.googleusercontent.com/a/default-user=s128",
    rating: 5,
    text:
      "Very customer-friendly and knowledgeable. He quickly found the cause of a leak and " +
      "repaired it very neatly. He really cares, going beyond the immediate cause. " +
      "He was also very helpful, even when it came to timing. Overall, a great experience.",
    relativeTimeDescription: "3 jaar geleden",
    time: 1683936000,
  },
  {
    authorName: "Aad Scholten",
    profilePhotoUrl: aadImg,
    rating: 5,
    text:
      "Reported a leak at 8 a.m. The problem was resolved the same day. " +
      "Expert and passionate about their work. Highly recommended.",
    relativeTimeDescription: "3 jaar geleden",
    time: 1683936001,
  },
  {
    authorName: "Laura Naaktgeboren",
    profilePhotoUrl: "https://lh3.googleusercontent.com/a/default-user=s128",
    rating: 5,
    text:
      "I called this morning. They came by the same day to look at the problem. " +
      "I received excellent help!",
    relativeTimeDescription: "5 jaar geleden",
    time: 1620000001,
  },
  {
    authorName: "Syl Bargmans",
    profilePhotoUrl: sylImg,
    rating: 5,
    text: "the best there is!!!!",
    relativeTimeDescription: "11 months ago",
    time: 1748736000,
  },
];

function getMockResponse(language: Language): GoogleReviewsResponse {
  return {
    aggregateRating: 5.0,
    totalReviews: 8,
    reviews: language === "en" ? REVIEWS_EN : REVIEWS_NL,
  };
}

// ---------------------------------------------------------------------------
// Fetcher — replace with real Places API call in production
// ---------------------------------------------------------------------------

async function fetchReviews(
  language: Language,
): Promise<GoogleReviewsResponse> {
  // TODO: replace with real endpoint, e.g.:
  // const response = await fetch(`/api/reviews`);
  // if (!response.ok) throw new Error('Failed to fetch reviews');
  // return response.json() as Promise<GoogleReviewsResponse>;

  return new Promise((resolve) =>
    setTimeout(() => resolve(getMockResponse(language)), 300),
  );
}

// ---------------------------------------------------------------------------
// Public hook
// ---------------------------------------------------------------------------

export function useGoogleReviews(
  language: Language,
): UseQueryResult<GoogleReviewsResponse> {
  return useQuery<GoogleReviewsResponse>({
    queryKey: [...reviewQueryKeys.list(), language],
    queryFn: () => fetchReviews(language),
    staleTime: 1000 * 60 * 60, // 1 hour — reviews don't change frequently
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}

export type { GoogleReview, GoogleReviewsResponse };
