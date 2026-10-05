import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { siteConfig } from "@/content/site";
import { galleryCopy } from "@/content/gallery";
import { LandingPage } from "@/pages/LandingPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { PrivacyPage } from "@/pages/PrivacyPage";

const GalleryPage = lazy(() => import("@/pages/GalleryPage"));

function RouteReset() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = /^\/gallery(?:\/|$)/.test(pathname)
      ? galleryCopy.documentTitle
      : siteConfig.title;
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <RouteReset />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/gallery"
          element={
            <Suspense
              fallback={
                <div className="gallery-loading" role="status">
                  {galleryCopy.loading}
                </div>
              }
            >
              <GalleryPage />
            </Suspense>
          }
        />
        <Route
          path="/gallery/index.html"
          element={
            <Suspense
              fallback={
                <div className="gallery-loading" role="status">
                  {galleryCopy.loading}
                </div>
              }
            >
              <GalleryPage />
            </Suspense>
          }
        />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
