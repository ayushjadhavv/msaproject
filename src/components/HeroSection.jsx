import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HeroSection({ brand }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, [brand.id]);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Accent gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 80% 50%, ${brand.accentColor}15 0%, transparent 60%)`,
        }}
      />

      {/* Side profile image or gradient fallback */}
      <div
        className="absolute inset-0 transition-all duration-1200"
        style={{
          backgroundImage: brand.heroImage
            ? `url(${brand.heroImage})`
            : "none",
          backgroundColor: brand.heroImage ? "transparent" : "rgba(10,10,10,0.98)",
          backgroundSize: "cover",
          backgroundPosition: "center right",
          opacity: loaded ? 0.55 : 0,
          transform: loaded ? "scale(1)" : "scale(1.04)",
          transition: "opacity 1.2s ease, transform 1.2s ease",
        }}
      />

      {/* Left gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(var(--bg-rgb),1) 0%, rgba(var(--bg-rgb),0.7) 40%, rgba(var(--bg-rgb),0.2) 70%, rgba(var(--bg-rgb),0) 100%)",
        }}
      />
      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64"
        style={{
          background:
            "linear-gradient(to top, rgba(var(--bg-rgb),1) 0%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-8 lg:px-20 pb-24 pt-36">
        {/* Brand tag */}
        <div
          className="flex items-center gap-4 mb-8 transition-all duration-700"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateY(20px)",
            transitionDelay: "0.1s",
          }}
        >
          {/*<div className="h-px w-8" style={{ background: brand.accentColor }} />
          <span
            className="font-condensed text-xs tracking-[0.4em] uppercase"
            style={{ color: brand.accentColor }}
          >
            {brand.year} Collection
          </span>*/}
        </div>

        {/* Brand name huge */}
        <h1
          className="font-display leading-none tracking-wide mb-2 transition-all duration-700"
          style={{
            fontSize: "clamp(4rem, 10vw, 10rem)",
            color: "white",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateY(30px)",
            transitionDelay: "0.2s",
          }}
        >
          {brand.name.toUpperCase()}
        </h1>

        {/* Model */}
        <h2
          className="font-display tracking-widest mb-6 transition-all duration-700"
          style={{
            fontSize: "clamp(1.5rem, 4vw, 4rem)",
            color: brand.accentColor,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateY(20px)",
            transitionDelay: "0.3s",
          }}
        >
          {brand.model}
        </h2>

        {/* Tagline */}
        <p
          className="font-body font-light italic text-xl text-white/40 mb-12 transition-all duration-700"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateY(20px)",
            transitionDelay: "0.4s",
          }}
        >
          "{brand.tagline}"
        </p>

        {/* CTA */}
        <div
          className="flex items-center gap-6 transition-all duration-700"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateY(20px)",
            transitionDelay: "0.5s",
          }}
        >
          <a
            href="#specs"
            className="font-condensed text-sm tracking-widest uppercase px-8 py-3 transition-all duration-300"
            style={{
              background: brand.accentColor,
              color: "#000",
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = "0.85";
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = "1";
            }}
          >
            Explore
          </a>
          <a
            href="#configurator"
            className="font-condensed text-sm tracking-widest uppercase px-8 py-3 border transition-all duration-300 text-white/60"
            style={{ borderColor: "rgba(255,255,255,0.2)" }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = brand.accentColor;
              e.target.style.color = brand.accentColor;
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "rgba(255,255,255,0.2)";
              e.target.style.color = "rgba(255,255,255,0.6)";
            }}
          >
            History
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 right-8 flex flex-col items-center gap-2 transition-all duration-700"
        style={{ opacity: loaded ? 1 : 0, transitionDelay: "0.8s" }}
      >
        <span
          className="font-condensed text-xs tracking-[0.3em] text-white/20 uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
        <div
          className="w-px h-12 animate-pulse-slow"
          style={{
            background: `linear-gradient(to bottom, ${brand.accentColor}, transparent)`,
          }}
        />
      </div>
    </section>
  );
}
