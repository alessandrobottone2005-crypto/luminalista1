import { BrandAsset } from "@/components/brand/BrandAsset";

export function DesktopRails() {
  return (
    <>
      <aside className="desktop-rail rail-left" aria-hidden="true">
        <BrandAsset variant="mark" className="rail-symbol" alt="" />
        <span>LUMINA - LISTA 01</span>
        <span className="rail-bottom">
          UNA NUOVA
          <br />
          PROSPETTIVA.
        </span>
      </aside>
      <aside className="desktop-rail rail-right" aria-hidden="true">
        <span>NAPOLI / GENTILESCHI</span>
        <span className="rail-vertical">FROM DARKNESS TO LIGHT</span>
        <span className="rail-bottom">
          SCROLL TO
          <br />
          MAKE IT BRIGHT.
        </span>
      </aside>
    </>
  );
}
