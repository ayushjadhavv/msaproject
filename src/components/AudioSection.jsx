import { useInView } from "./useInView";
import "@google/model-viewer";

export default function ModelSection({ brand }) {
  const [ref, inView] = useInView();
  const selectedModelFile = brand.modelFile || "";
  const selectedVideoSrc = brand.animationVideo || `/media/${brand.id}/${brand.id}.mp4`;

  return (
    <section
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
            Digital Experience
          </span>
        </div>
        <h2 className="font-display text-5xl lg:text-7xl tracking-wide text-white mt-3">
          3D MODEL & VIDEO LIBRARY
        </h2>
      </div>

      <div ref={ref} className="px-8 lg:px-20">
        <div className="grid lg:grid-cols-[0.95fr_1fr] gap-16 items-start">
          <div
            className="relative overflow-hidden rounded-[30px] transition-all duration-1000"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateX(-30px)",
              background: `radial-gradient(circle at top left, ${brand.accentColor}15, transparent 40%)`,
              border: `1px solid rgba(255,255,255,0.08)`,
            }}
          >
            {selectedModelFile ? (
              <model-viewer
                src={selectedModelFile}
                poster={brand.modelImage || brand.frontImage}
                alt={`${brand.model} 3D model`}
                camera-controls
                auto-rotate
                environment-image="neutral"
                shadow-intensity="1"
                exposure="1"
                interaction-prompt="auto"
                className="w-full h-full"
                style={{ width: "100%", minHeight: "520px", border: "none" }}
              />
            ) : (
              <img
                src={brand.modelImage || brand.frontImage}
                alt={`${brand.model} 3D model preview`}
                className="w-full object-cover"
                style={{ height: "520px" }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = brand.frontImage;
                }}
              />
            )}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(180deg, rgba(0,0,0,0.08), transparent 55%)",
              }}
            />
            <div className="absolute bottom-6 left-6 z-10">
              <span
                className="font-condensed text-xs tracking-widest uppercase"
                style={{ color: brand.accentColor }}
              >
                Interactive Preview
              </span>
              <h3 className="font-display text-3xl text-white mt-2">
                {brand.model}
              </h3>
            </div>
          </div>

          <div
            className="transition-all duration-1000"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateX(30px)",
              transitionDelay: "0.2s",
            }}
          >
            <div className="mb-8">
              <div className="font-condensed text-xs tracking-[0.4em] uppercase text-white/30 mb-3">
                Flight Media
              </div>
            
            </div>

            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black">
              <video
                key={brand.id}
                src={selectedVideoSrc}
                controls
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                style={{ minHeight: "320px" }}
              />
              <div
                className="absolute bottom-4 left-4 font-condensed text-xs tracking-widest uppercase"
                style={{ color: brand.accentColor }}
              >
                {brand.name} · {brand.model}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-8">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="font-condensed text-xs tracking-widest uppercase text-white/40 mb-3">
                  Aircraft
                </div>
                <div className="font-display text-2xl text-white mb-1">
                  {brand.name}
                </div>
                <div className="font-condensed text-[11px] uppercase tracking-[0.33em] text-white/40">
                  {brand.model}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
