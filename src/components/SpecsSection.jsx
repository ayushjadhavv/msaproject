import { useInView } from "./useInView";
import { useState, useEffect, useRef } from "react";

function MainImage({ brand }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const thumbs = (brand.galleryImages && brand.galleryImages.length > 0)
    ? brand.galleryImages
    : [brand.frontImage || brand.heroImage];

  const current = thumbs[currentIndex] || brand.heroImage;

  useEffect(() => {
    // Auto-rotate every 1.5 seconds
    intervalRef.current = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % thumbs.length);
    }, 1500);

    return () => clearInterval(intervalRef.current);
  }, [thumbs.length]);

  const pause = () => clearInterval(intervalRef.current);
  const resume = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % thumbs.length);
    }, 1500);
  };

  return (
    <>
      <img
        src={current}
        alt={`${brand.name} ${brand.model} view`}
        className="w-full object-cover transition-transform duration-700 hover:scale-105"
        style={{ height: "420px" }}
        loading="lazy"
        decoding="async"
        onError={(e) => {
          e.target.src = brand.heroImage;
        }}
        onMouseEnter={pause}
        onMouseLeave={resume}
      />

      <div className="mt-4 flex gap-3">
        {thumbs.map((src, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-20 h-12 overflow-hidden rounded-md border-2 p-0 bg-white/5 flex-shrink-0 ${
              current === src ? "ring-2 ring-offset-1" : ""
            }`}
            aria-label={`Show view ${i + 1}`}
          >
            <img
              src={src}
              alt={`thumb-${i}`}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.target.src = brand.heroImage;
              }}
            />
          </button>
        ))}
      </div>
    </>
  );
}

export default function SpecsSection({ brand }) {
  const [ref, inView] = useInView();
  const [showMore, setShowMore] = useState(false);

  return (
    <section
      id="specs"
      className="relative py-24 overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Section label */}
      <div className="px-8 lg:px-20 mb-16">
        <div className="flex items-center gap-4">
          <div className="h-px w-8" style={{ background: brand.accentColor }} />
          <span
            className="font-condensed text-xs tracking-[0.4em] uppercase"
            style={{ color: brand.accentColor }}
          >
            Performance Figures
          </span>
        </div>
        <h2 className="font-display text-5xl lg:text-7xl tracking-wide text-white mt-3">
          AT A GLANCE
        </h2>
      </div>

      <div
        ref={ref}
        className="px-8 lg:px-20 grid lg:grid-cols-2 gap-16 items-center"
      >
        {/* Front profile image */}
        <div
          className="relative overflow-hidden transition-all duration-1000"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateX(-40px)",
          }}
        >
          <MainImage brand={brand} />
          {/* Corner accent */}
          <div
            className="absolute top-0 left-0 w-16 h-16 pointer-events-none"
            style={{
              borderTop: `2px solid ${brand.accentColor}`,
              borderLeft: `2px solid ${brand.accentColor}`,
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none"
            style={{
              borderBottom: `2px solid ${brand.accentColor}`,
              borderRight: `2px solid ${brand.accentColor}`,
            }}
          />
        </div>

        {/* Basic specs */}
        <div
          className="transition-all duration-1000"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateX(40px)",
            transitionDelay: "0.2s",
          }}
        >
          <div className="grid grid-cols-2 gap-8">
            {Object.entries(brand.basicSpecs).map(([key, val], i) => (
              <div
                key={key}
                className="transition-all duration-700"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "none" : "translateY(20px)",
                  transitionDelay: `${0.3 + i * 0.1}s`,
                }}
              >
                <div
                  className="font-display text-4xl lg:text-5xl leading-none mb-2"
                  style={{ color: brand.accentColor }}
                >
                  {val.split(" ")[0]}
                </div>
                <div className="font-condensed text-xs tracking-widest uppercase text-white/40 mb-1">
                  {val.split(" ").slice(1).join(" ")}
                </div>
                <div className="font-condensed text-sm tracking-wider text-white/60 uppercase">
                  {key}
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div
            className="my-10 h-px transition-all duration-1000"
            style={{
              background: `linear-gradient(to right, ${brand.accentColor}, transparent)`,
              width: inView ? "100%" : "0%",
              transitionDelay: "0.5s",
            }}
          />

          {/* More specs toggle */}
          <div className="mt-4">
            <button
              onClick={() => setShowMore((s) => !s)}
              className="font-condensed text-xs tracking-widest uppercase px-3 py-2 border rounded-md"
              style={{ borderColor: brand.accentColor, color: brand.accentColor }}
            >
              {showMore ? "Hide Details" : "Show More Specs"}
            </button>
          </div>

          {showMore && brand.extraSpecs && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Object.entries(brand.extraSpecs).map(([k, v]) => (
                <div key={k}>
                  <div className="font-display text-2xl mb-1" style={{ color: brand.accentColor }}>
                    {typeof v === 'string' ? v.split(' ')[0] : ''}
                  </div>
                  <div className="font-condensed text-xs tracking-widest uppercase text-white/40 mb-1">
                    {typeof v === 'string' ? v.split(' ').slice(1).join(' ') : ''}
                  </div>
                  <div className="font-condensed text-sm tracking-wider text-white/60 uppercase">{k}</div>
                </div>
              ))}
            </div>
          )}

          {/* Model subtitle */}
          <div className="font-condensed text-xs tracking-[0.3em] uppercase text-white/30">
            {brand.model} · {brand.year}
          </div>
          <div className="font-body font-light text-white/50 text-sm mt-2 leading-relaxed max-w-sm">
            {brand.overview
              ? brand.overview
              : `The pinnacle of ${brand.name}'s engineering — combining raw performance with refined sophistication.`}
          </div>
        </div>
      </div>
    </section>
  );
}
