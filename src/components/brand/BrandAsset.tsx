import { BRAND_ASSETS } from "@/config/assets";
import { cn } from "@/lib/utils";

type BrandAssetProps = {
  variant?: keyof typeof BRAND_ASSETS;
  alt?: string;
  className?: string;
};

export function BrandAsset({
  variant = "logo",
  alt = "Lumina - Lista 01",
  className,
}: BrandAssetProps) {
  return (
    <img
      className={cn("brand-asset", className)}
      src={BRAND_ASSETS[variant]}
      alt={alt}
    />
  );
}
