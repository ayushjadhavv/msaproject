import { Link, useParams, useLocation } from "react-router-dom";
import { brands } from "../data/jets";
import { useState, useEffect } from "react";

export default function Navbar() {
  const location = useLocation();
  const { brandId } = useParams();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    try {
      return (
        localStorage.getItem("theme") ||
        (window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark")
      );
    } catch (e) {
      return "dark";
    }
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  useEffect(() => {
    try {
      if (theme === "light") document.documentElement.classList.add("light");
      else document.documentElement.classList.remove("light");
      localStorage.setItem("theme", theme);
    } catch (e) {}
  }, [theme]);

  const activeBrand = brands.find((b) => location.pathname.includes(b.id));
  const accent = activeBrand?.accentColor || "#C8A951";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(var(--bg-rgb),0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
      }}
    >
      <div className="flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="font-display text-2xl tracking-widest"
          style={{ color: accent, transition: "color 0.5s" }}
        >
          MSA PROJECT
        </Link>

        {/* Desktop brand links */}
        <div className="hidden lg:flex items-center gap-6">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              to={`/jet/${brand.id}`}
              className={`brand-pill font-condensed text-xs tracking-widest uppercase pb-1 ${location.pathname.includes(brand.id) ? "active" : ""}`}
              style={{
                color: location.pathname.includes(brand.id)
                  ? accent
                  : "var(--text-secondary)",
                "--accent": accent,
              }}
            >
              {brand.name}
            </Link>
          ))}
        </div>

        {/* Theme toggle removed per user request */}

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`block h-px w-6 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            style={{ background: "var(--text-primary)" }}
          />
          <span
            className={`block h-px w-6 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            style={{ background: "var(--text-primary)" }}
          />
          <span
            className={`block h-px w-6 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            style={{ background: "var(--text-primary)" }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden transition-all duration-400 overflow-hidden`}
        style={{
          maxHeight: menuOpen ? "600px" : "0",
          background: "var(--surface)",
        }}
      >
        <div className="px-8 py-6 flex flex-col gap-4">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              to={`/jet/${brand.id}`}
              className="font-condensed text-sm tracking-widest uppercase"
              style={{
                color: location.pathname.includes(brand.id)
                  ? accent
                  : "var(--text-secondary)",
              }}
            >
              {brand.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
