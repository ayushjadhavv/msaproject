import { useInView } from "./useInView";
import { useRef, useState } from "react";

export default function AnimationSection({ brand }) {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const [triggered, setTriggered] = useState(false);
  const [key, setKey] = useState(0);
  const videoRef = useRef(null);
  const videoScale = brand.animationVideoScale ?? 1;
  const videoPosition = brand.animationVideoPosition ?? "center center";
  const videoFrameWidth = brand.animationVideoWidth ?? "540px";
  const videoFrameHeight = brand.animationVideoHeight ?? "190px";
  const videoFull = brand.animationVideoFull ?? false;
  const videoSrc = brand.animationVideo || `/media/${brand.id}/${brand.id}.mp4`;

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      return;
    }

    setTriggered(false);
    setTimeout(() => {
      setKey((k) => k + 1);
      setTriggered(true);
    }, 50);
  };

  // Trigger once when in view
  if (inView && !triggered) setTriggered(true);

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
            In Motion
          </span>
        </div>
        <h2 className="font-display text-5xl lg:text-7xl tracking-wide text-white mt-3">
          PURE MOTION
        </h2>
      </div>

      <div ref={ref}>
        {/* Track / road */}
        <div
          className="relative overflow-hidden"
          style={{
            height: videoFull ? "100vh" : "280px",
            background:
              "linear-gradient(to bottom, var(--bg) 0%, var(--surface) 40%, var(--bg) 100%)",
          }}
        >
          {/* Road lines */}
          <div
            className="absolute bottom-24 left-0 right-0 h-px"
            style={{
              background: `repeating-linear-gradient(90deg, ${brand.accentColor}40 0px, ${brand.accentColor}40 40px, transparent 40px, transparent 80px)`,
            }}
          />
          <div
            className="absolute bottom-20 left-0 right-0 h-px"
            style={{ background: "rgba(255,255,255,0.05)" }}
          />

          {/* Ground shadow */}
          <div
            className="absolute bottom-20 left-0 right-0"
            style={{
              height: "40px",
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)",
            }}
          />

          {/* Speed lines background */}
          {triggered && (
            <div
              key={`lines-${key}`}
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 8px, ${brand.accentColor}08 8px, ${brand.accentColor}08 9px)`,
                animation: "fadeIn 0.5s ease",
              }}
            />
          )}

          {/* Car video */}
          {triggered && (
            <div
              key={`car-${key}`}
              style={{
                position: "absolute",
                bottom: videoFull ? 0 : "22px",
                left: 0,
                right: 0,
                top: videoFull ? 0 : "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: videoFull ? "stretch" : "flex-end",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: videoFull ? "100%" : videoFrameHeight,
                  overflow: "hidden",
                  borderRadius: videoFull ? 0 : "18px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: videoFull ? "stretch" : "center",
                }}
              >
                <video
                  ref={videoRef}
                  src={videoSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: videoPosition,
                    transform: `scale(${videoScale})`,
                    transformOrigin: "center center",
                    display: "block",
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            </div>
          )}

          {/* Motion blur overlay */}
          {triggered && (
            <div
              key={`blur-${key}`}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(to right, rgba(8,8,8,0.3), transparent 30%, transparent 70%, rgba(8,8,8,0.3))`,
              }}
            />
          )}

          {/* Speed stat overlay */}
          <div className="absolute top-8 right-12 text-right">
            <div
              className="font-display text-6xl leading-none"
              style={{ color: brand.accentColor, opacity: 0.15 }}
            >
              {brand.detailedSpecs?.["Top Speed"]?.split(" ")[0]}
            </div>
            <div className="font-condensed text-xs tracking-widest text-white/20">
              KM/H TOP SPEED
            </div>
          </div>
        </div>

        {/* Controls 
        <div className="px-8 lg:px-20 mt-8 flex items-center gap-6">
          <button
            onClick={handleReplay}
            className="font-condensed text-xs tracking-widest uppercase px-6 py-2 border transition-all duration-300"
            style={{
              borderColor: `${brand.accentColor}60`,
              color: brand.accentColor,
            }}
            onMouseEnter={(e) => {
              e.target.style.background = brand.accentColor;
              e.target.style.color = "#000";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = brand.accentColor;
            }}
          >
            ↺ Replay Video
          </button>
          <span className="font-condensed text-xs text-white/20 tracking-wider">
            MP4 video · {brand.model}
          </span>
        </div>*/}
      </div>
    </section>
  );
}
