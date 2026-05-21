/**
 * Agent A: Router configuration and layout shell for Barg Dak.
 * Provides MainLayout (Header + Footer) wrapping all page routes.
 */

import { useEffect } from "react";
import {
  Navigate,
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { ROUTES } from "./routes";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import HomePage from "./pages/HomePage";
import { useLanguage } from "./i18n/language";

function LanguageRouteSync(): React.ReactElement | null {
  const location = useLocation();
  const { setLanguage } = useLanguage();

  useEffect(() => {
    if (location.pathname.startsWith(ROUTES.HOME_EN)) {
      setLanguage("en");
      return;
    }

    if (location.pathname.startsWith(ROUTES.HOME_NL)) {
      setLanguage("nl");
    }
  }, [location.pathname, setLanguage]);

  return null;
}

// ---------------------------------------------------------------------------
// Main layout wrapper
// ---------------------------------------------------------------------------

function MainLayout(): React.ReactElement {
  return (
    <>
      <LanguageRouteSync />
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}

// ---------------------------------------------------------------------------
// Placeholder page — replaced by Agent C
// ---------------------------------------------------------------------------

function PlaceholderPage({ title }: { title: string }): React.ReactElement {
  return <div data-page={title} />;
}

// ---------------------------------------------------------------------------
// Route definitions
// ---------------------------------------------------------------------------

const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <Navigate to={ROUTES.HOME_NL} replace />,
  },
  {
    path: ROUTES.HOME_NL,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: ROUTES.HOME_EN,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "*",
    element: <PlaceholderPage title="NotFound" />,
  },
];

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

const router = createBrowserRouter(
  routes,
  basePath
    ? {
        basename: basePath,
      }
    : undefined,
);

// ---------------------------------------------------------------------------
// Public exports
// ---------------------------------------------------------------------------

export { MainLayout, SiteHeader as Header, SiteFooter as Footer, router };

export default function RouterRoot(): React.ReactElement {
  return <RouterProvider router={router} />;
}
