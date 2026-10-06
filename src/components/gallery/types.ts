export interface GalleryPhoto {
  id: string;
  width: number;
  height: number;
  variants: { src: string; width: number; height: number }[];
}

export interface GalleryDay {
  id: string;
  number: number;
  date: string;
  label: string;
  photos: GalleryPhoto[];
}

export const photoSrcSet = (photo: GalleryPhoto) =>
  photo.variants
    .map((variant) => `${variant.src} ${variant.width}w`)
    .join(", ");

export const fullPhoto = (photo: GalleryPhoto) =>
  photo.variants[photo.variants.length - 1].src;
