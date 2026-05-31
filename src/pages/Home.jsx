import { Link } from "react-router-dom";
import { brands } from "../data/jets";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [hoveredBrand, setHoveredBrand] = useState(null);
  const [playing, setPlaying] = useState(() => {
    if (typeof window === "undefined") return false;
    return JSON.parse(localStorage.getItem("homeAudioPlaying") ?? "false");
  });
  const audioRef = useRef(null);
  const audioSrc = "/ElevenLabs_Military_jet_fighter_engine_roar,_F-15_overhead_pass,_sustained_turbine_sound,_afterburner_trail,_wa.mp3";

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Preload first few hero images and logos to improve perceived performance
  useEffect(() => {
    const head = document.head;
    const toPreload = brands.slice(0, 4);
    const links = [];
    toPreload.forEach((b) => {
      if (b.heroImage) {
        const l = document.createElement("link");
        l.rel = "preload";
        l.as = "image";
        l.href = b.heroImage;
        head.appendChild(l);
        links.push(l);
      }
      if (b.logoUrl) {
        const l2 = document.createElement("link");
        l2.rel = "preload";
        l2.as = "image";
        l2.href = b.logoUrl;
        head.appendChild(l2);
        links.push(l2);
      }
    });
    return () => links.forEach((l) => head.removeChild(l));
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.preload = playing ? "auto" : "none";
    localStorage.setItem("homeAudioPlaying", JSON.stringify(playing));

    if (playing) {
      audioRef.current
        .play()
        .catch(() => {
          // Autoplay may be blocked until the user interacts with the page.
        });
    } else {
      audioRef.current.pause();
    }
  }, [playing]);

  const hovered = brands.find((b) => b.id === hoveredBrand);

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Dynamic background accent from hovered brand */}
      <div
        className="absolute inset-0 transition-all duration-700 pointer-events-none"
        style={{
          background: hovered
            ? `radial-gradient(ellipse at 60% 50%, ${hovered.accentColor}18 0%, transparent 65%)`
            : "radial-gradient(ellipse at 60% 50%, rgba(200,169,81,0.06) 0%, transparent 65%)",
        }}
      />

      {/* Hero text background */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ opacity: 0.03 }}
      >
        <span className="font-display text-[28vw] leading-none tracking-tighter text-white">
        MSA PROJECT
        </span>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="pt-32 pb-16 px-8 lg:px-20 relative">
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setPlaying((prev) => !prev)}
              className="rounded-full border border-white/20 bg-black/50 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white transition hover:bg-white/10"
              style={{ backdropFilter: "blur(10px)" }}
            >
              {playing ? "Pause Audio" : "Play Audio"}
            </button>
          </div>
          <div
            className="transition-all duration-1000"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "none" : "translateY(40px)",
            }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-yellow-500/60" />
              <span className="font-condensed text-xs tracking-[0.3em] uppercase text-yellow-500/60">
                The Pinnacle Collection
              </span>
            </div>
            <h1 className="font-display text-7xl lg:text-9xl leading-none tracking-wide text-white mb-4">
              FIGHTER JET
              <br />
              <span
                style={{
                  color: hovered ? hovered.accentColor : "#C8A951",
                  transition: "color 0.5s",
                }}
              >
                SHOWCASE
              </span>
            </h1>
            <p className="font-body font-light text-white/40 text-lg max-w-md mt-6 leading-relaxed">
              Six legends. Six air forces. Select a nation to begin your journey
              into aerial dominance.
            </p>
          </div>
        </div>

        {/* Brand Grid */}
        <div className="flex-1 px-8 lg:px-20 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {brands.map((brand, i) => (
              <Link
                key={brand.id}
                to={`/jet/${brand.id}`}
                onMouseEnter={() => setHoveredBrand(brand.id)}
                onMouseLeave={() => setHoveredBrand(null)}
                className="group relative overflow-hidden"
                style={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? "none" : "translateY(20px)",
                  transition: `opacity 0.6s ease ${i * 0.07}s, transform 0.6s ease ${i * 0.07}s`,
                }}
              >
                {/* Card */}
                    <div
                  className="relative h-48 md:h-64 flex flex-col justify-end p-5 overflow-hidden"
                  style={{
                    background: "var(--surface)",
                    border: `1px solid var(--border)`,
                    transition: "border-color 0.3s, background 0.3s",
                  }}
                >
                  {/* Hover accent corner */}
                  <div
                    className="absolute top-0 left-0 w-full h-full transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${brand.accentColor}20 0%, transparent 60%)`,
                      opacity: hoveredBrand === brand.id ? 1 : 0,
                    }}
                  />

                  {/* Brand hero image background */}
                  <div
                    className="absolute inset-0 transition-all duration-700"
                    style={{
                      backgroundImage: brand.heroImage
                        ? `url(${brand.heroImage}), radial-gradient(circle at center, ${brand.accentColor}20, transparent 55%)`
                        : `radial-gradient(circle at center, ${brand.accentColor}20, transparent 55%)`,
                      backgroundSize: "cover, cover",
                      backgroundPosition: "center, center",
                      opacity: hoveredBrand === brand.id ? 1 : 0.8,
                      transform:
                        hoveredBrand === brand.id ? "scale(1.02)" : "scale(1)",
                    }}
                  />

                  {/* Accent line top */}
                  <div
                    className="absolute top-0 left-0 h-px transition-all duration-500"
                    style={{
                      background: brand.accentColor,
                      width: hoveredBrand === brand.id ? "100%" : "0%",
                    }}
                  />

                  {/* Number */}
                  <span
                    className="absolute top-4 right-4 font-display text-5xl leading-none transition-all duration-300"
                    style={{
                      color:
                        hoveredBrand === brand.id
                          ? brand.accentColor
                          : "rgba(255,255,255,0.05)",
                      opacity: 1,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Brand logo */}
                  <img
                    src={brand.logoUrl || `/media/${brand.id}/${brand.id}_logo.svg`}
                    alt={`${brand.name} logo`}
                    className="absolute top-3 left-3 w-16 h-10 object-contain z-20 opacity-90"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = brand.frontImage || brand.heroImage;
                    }}
                  />

                  {/* Brand info */}
                  <div className="relative z-10">
                    <div className="font-display text-2xl md:text-3xl tracking-wider text-white mb-1">
                      {brand.name.toUpperCase()}
                    </div>
                    <div
                      className="font-condensed text-xs tracking-widest uppercase transition-colors duration-300"
                      style={{
                        color:
                          hoveredBrand === brand.id
                            ? brand.accentColor
                            : "rgba(255,255,255,0.3)",
                      }}
                    >
                      {brand.model}
                    </div>

                    {/* Arrow */}
                    <div
                      className="mt-3 flex items-center gap-2 font-condensed text-xs tracking-widest uppercase transition-all duration-300"
                      style={{
                        color: brand.accentColor,
                        opacity: hoveredBrand === brand.id ? 1 : 0,
                        transform:
                          hoveredBrand === brand.id
                            ? "translateX(0)"
                            : "translateX(-8px)",
                      }}
                    >
                      <span>Explore</span>
                      <span>→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer line */}
        <div className="px-8 lg:px-20 pb-8 flex items-center justify-between">
          <span className="font-condensed text-xs tracking-widest text-white/20 uppercase">
            © 2025 Fighter Jet Showcase — Six-jet Multimedia Mini Project
          </span>
        </div>
      </div>
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload={playing ? "auto" : "none"}
      />
    </div>
  );
}
