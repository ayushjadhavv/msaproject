import { useInView } from "./useInView";

export default function Configurator({ brand }) {
  const [ref, inView] = useInView();

  return (
    <section
      id="configurator"
      className="py-24 overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      <div className="px-8 lg:px-20 mb-12">
        <div className="flex items-center gap-4">
          <div className="h-px w-8" style={{ background: brand.accentColor }} />
          <span
            className="font-condensed text-xs tracking-[0.4em] uppercase"
            style={{ color: brand.accentColor }}
          >
            Heritage
          </span>
        </div>
        <h2 className="font-display text-5xl lg:text-7xl tracking-wide text-white mt-3">
          Story
        </h2>
      </div>

      <div ref={ref} className="px-8 lg:px-20">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-16 items-center">
          <div
            className="relative overflow-hidden transition-all duration-1000 flex items-center justify-center min-h-[360px]"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(30px)",
              background: `radial-gradient(circle at 50% 40%, ${brand.accentColor}22 0%, rgba(255,255,255,0.03) 38%, rgba(255,255,255,0.02) 58%, rgba(255,255,255,0) 78%)`,
              boxShadow: `inset 0 0 0 1px ${brand.accentColor}14, 0 24px 80px ${brand.accentColor}10`,
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(135deg, ${brand.accentColor}18 0%, transparent 42%, ${brand.accentColor}10 100%)`,
              }}
            />
            <img
              src={brand.logoUrl || `/media/${brand.id}/${brand.id}_logo.svg`}
              alt={`${brand.name} logo`}
              className="relative z-10 max-w-[80%] max-h-[250px] object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
              loading="lazy"
              decoding="async"
              onError={(event) => {
                event.currentTarget.onerror = null;
                const currentSrc = event.currentTarget.src;
                if (currentSrc.endsWith(".svg")) {
                  event.currentTarget.src = `/media/${brand.id}/${brand.id}_logo.png`;
                } else {
                  event.currentTarget.src = brand.frontImage;
                }
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at center, ${brand.accentColor}18 0%, transparent 62%)`,
              }}
            />
          </div>

          <div
            className="transition-all duration-1000"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateX(30px)",
              transitionDelay: "0.2s",
            }}
          >
            <div className="font-condensed text-xs tracking-[0.4em] uppercase text-white/30 mb-4">
              {brand.name}
            </div>
            <h3
              className="font-display text-3xl lg:text-5xl leading-tight mb-6"
              style={{ color: brand.accentColor }}
            >
              {brand.tagline}
            </h3>
            <p className="font-sans text-base lg:text-lg leading-8 text-white/75 max-w-2xl">
              {brand.history}
            </p>
            {brand.overview && (
              <div className="mt-6">
                <h4 className="font-condensed text-xs tracking-[0.3em] uppercase text-white/30 mb-2">Overview</h4>
                <p className="font-sans text-base lg:text-lg leading-8 text-white/75 max-w-2xl">{brand.overview}</p>
              </div>
            )}

            {brand.design && (
              <div className="mt-6">
                <h4 className="font-condensed text-xs tracking-[0.3em] uppercase text-white/30 mb-2">Design</h4>
                <p className="font-sans text-base lg:text-lg leading-8 text-white/75 max-w-2xl">{brand.design}</p>
              </div>
            )}

            {brand.operationalUse && (
              <div className="mt-6">
                <h4 className="font-condensed text-xs tracking-[0.3em] uppercase text-white/30 mb-2">Operational Use</h4>
                <p className="font-sans text-base lg:text-lg leading-8 text-white/75 max-w-2xl">{brand.operationalUse}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}