import { Link, useParams } from "react-router-dom";
import { brands } from "../data/jets";

export default function BrandNav({ currentBrand }) {
  const currentIdx = brands.findIndex((b) => b.id === currentBrand.id);
  const prev = brands[currentIdx - 1];
  const next = brands[currentIdx + 1];

  return (
    <section
      className="py-20 px-8 lg:px-20"
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Brand dots navigation */}
        <div className="flex justify-center gap-3 mb-16">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              to={`/jet/${brand.id}`}
              className="group flex flex-col items-center gap-2"
            >
              <div
                className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                style={{
                  background:
                    brand.id === currentBrand.id
                      ? currentBrand.accentColor
                      : "rgba(255,255,255,0.2)",
                  transform:
                    brand.id === currentBrand.id ? "scale(1.5)" : "scale(1)",
                }}
              />
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Previous */}
          {prev ? (
            <Link
              to={`/jet/${prev.id}`}
              className="group text-left p-6 border border-white/5 hover:border-white/15 transition-all duration-300"
            >
              <div className="font-condensed text-xs tracking-widest uppercase text-white/20 mb-3">
                ← Previous
              </div>
              <div className="font-display text-3xl text-white group-hover:text-white/80 transition-colors">
                {prev.name.toUpperCase()}
              </div>
              <div className="font-condensed text-xs tracking-wider text-white/30 mt-1">
                {prev.model}
              </div>
            </Link>
          ) : (
            <div />
          )}

          {/* Next */}
          {next ? (
            <Link
              to={`/jet/${next.id}`}
              className="group text-right p-6 border border-white/5 hover:border-white/15 transition-all duration-300 ml-auto w-full"
            >
              <div className="font-condensed text-xs tracking-widest uppercase text-white/20 mb-3">
                Next →
              </div>
              <div className="font-display text-3xl text-white group-hover:text-white/80 transition-colors">
                {next.name.toUpperCase()}
              </div>
              <div className="font-condensed text-xs tracking-wider text-white/30 mt-1">
                {next.model}
              </div>
            </Link>
          ) : (
            <Link
              to="/"
              className="group text-right p-6 border border-white/5 hover:border-white/15 transition-all duration-300 ml-auto w-full"
            >
              <div className="font-condensed text-xs tracking-widest uppercase text-white/20 mb-3">
                Back to →
              </div>
              <div className="font-display text-3xl text-white group-hover:text-white/80 transition-colors">
                HOME
              </div>
              <div className="font-condensed text-xs tracking-wider text-white/30 mt-1">
                All Nations
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
