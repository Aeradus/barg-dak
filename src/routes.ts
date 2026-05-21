/**
 * Agent A: Route map for the Barg Dak website.
 * All route paths and metadata are defined here as a single source of truth.
 */

export const ROUTES = {
  HOME: "/",
  HOME_NL: "/nl",
  HOME_EN: "/en",
  ABOUT: "/about",
  SERVICES: "/diensten",
  PROJECTS: "/projecten",
  CONTACT: "/contact",
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
