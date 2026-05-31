import { useInView } from "./useInView";
import { useState } from "react";

export default function GallerySection({ brand }) {
  const [ref, inView] = useInView();
  const [activeImg, setActiveImg] = useState(0);

  const angles = ["Front", "Back", "Cockpit", "Right Side", "Left Side"];
  const formatUSD = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <section
      className="py-24 overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      <div className="px-8 lg:px-20 mb-16">
        <div className="flex items-center gap-4">
          <div className="h-px w-8" style={{ background: brand.accentColor }} />
          <span
            className="font-condensed text-xs tracking-[0.4em] uppercase"
            style={{ color: brand.accentColor }}
          >
            Every Angle
          </span>
        </div>
        <h2 className="font-display text-5xl lg:text-7xl tracking-wide text-white mt-3">
          DESIGN & DETAIL
        </h2>
      </div>

      <div ref={ref} className="px-8 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Main gallery image */}
          <div>
            <div
              className="relative overflow-hidden transition-all duration-1000"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(30px)",
              }}
            >
              <img
                key={activeImg}
                src={brand.galleryImages[activeImg] || brand.heroImage}
                alt={`${angles[activeImg]} view`}
                className="w-full object-contain"
                style={{ height: "420px", animation: "fadeIn 0.4s ease" }}
                onError={(e) => {
                  e.target.src = brand.heroImage;
                }}
              />
              {/* Angle label */}
              <div
                className="absolute bottom-4 left-4 font-condensed text-xs tracking-widest uppercase px-3 py-1"
                style={{
                  background: "rgba(0,0,0,0.7)",
                  color: brand.accentColor,
                  border: `1px solid ${brand.accentColor}40`,
                }}
              >
                {angles[activeImg]} View
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-3">
              {brand.galleryImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className="relative overflow-hidden flex-1 transition-all duration-300"
                  style={{
                    height: "72px",
                    border:
                      activeImg === i
                        ? `1px solid ${brand.accentColor}`
                        : "1px solid rgba(255,255,255,0.08)",
                    opacity: activeImg === i ? 1 : 0.5,
                  }}
                >
                  <img
                    src={img}
                    alt={angles[i]}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.src = brand.heroImage;
                    }}
                  />
                  <div
                    className="absolute bottom-1 left-1 font-condensed text-xs"
                    style={{
                      color: brand.accentColor,
                      fontSize: "10px",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {angles[i]}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Detailed specs table */}
          <div
            className="transition-all duration-1000"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateX(30px)",
              transitionDelay: "0.2s",
            }}
          >
            <h3 className="font-condensed text-sm tracking-widest uppercase text-white/40 mb-6">
              Full Specifications
            </h3>
            <div>
              {Object.entries(brand.detailedSpecs).map(([key, val], i) => (
                <div
                  key={key}
                  className="spec-row transition-all duration-700"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "none" : "translateX(20px)",
                    transitionDelay: `${0.3 + i * 0.06}s`,
                  }}
                >
                  <span className="text-white/40 uppercase tracking-widest text-xs">
                    {key}
                  </span>
                  <span
                    className="font-semibold"
                    style={{ color: brand.accentColor }}
                  >
                    {val}
                  </span>
                </div>
              ))}
            </div>

            {/* Price preview */}
            <div
              className="mt-10 p-5 transition-all duration-700"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: `1px solid ${brand.accentColor}30`,
                opacity: inView ? 1 : 0,
                transitionDelay: "0.8s",
              }}
            >
              <div className="font-condensed text-xs tracking-widest uppercase text-white/30 mb-2">
                Unit Cost
              </div>
              <div
                className="font-display text-4xl"
                style={{ color: brand.accentColor }}
              >
                {formatUSD(brand.price)}
              </div>
              <div className="font-condensed text-xs text-white/20 mt-1 tracking-wider">
                Before taxes & options
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
