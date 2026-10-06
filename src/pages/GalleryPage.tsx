import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { GalleryCarousel } from "@/components/gallery/GalleryCarousel";
import type { GalleryDay, GalleryPhoto } from "@/components/gallery/types";
import gallery from "@/config/gallery.json";
import { galleryCopy } from "@/content/gallery";
import "@/styles/gallery.css";

const days = (gallery.days ?? []) as GalleryDay[];
const photos: GalleryPhoto[] = [...days]
  .sort((a, b) => b.number - a.number)
  .flatMap((day) => day.photos);

export default function GalleryPage() {
  return (
    <main className="gallery-page">
      <header className="gallery-header">
        <Link className="gallery-back" to="/">
          <ArrowLeft size={18} aria-hidden="true" />
          {galleryCopy.back}
        </Link>
        <h1>{galleryCopy.title}</h1>
      </header>
      {photos.length ? (
        <GalleryCarousel photos={photos} />
      ) : (
        <p className="gallery-empty">{galleryCopy.empty}</p>
      )}
      <p className="gallery-colophon">
        © 2026 LUMINA · <Link to="/privacy">PRIVACY</Link>
      </p>
    </main>
  );
}
