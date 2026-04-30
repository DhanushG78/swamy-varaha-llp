"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const staticNavLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/properties", label: "Properties" },
];

const endNavLinks = [
  { href: "/agents", label: "Agents" },
];

const Navbar = ({ categories = [] }: { categories?: any[] }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-lg" : ""
      }`}
      style={{ backgroundColor: "#1e1e1e" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-1 group">
            <span className="text-xl font-bold text-white tracking-wide">
              Swamy Varaha
            </span>
            <span className="text-xl font-light tracking-wide" style={{ color: "#e63946" }}>
              LLP
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {staticNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors duration-200 relative group"
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-3 right-3 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"
                  style={{ backgroundColor: "#e63946" }}
                />
              </Link>
            ))}

            {/* Categories Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCategoriesOpen(true)}
              onMouseLeave={() => setCategoriesOpen(false)}
            >
              <button className="px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors duration-200 relative group flex items-center gap-1">
                Categories
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${categoriesOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span
                  className="absolute bottom-0 left-3 right-3 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"
                  style={{ backgroundColor: "#e63946" }}
                />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-0 mt-0 w-48 rounded-md shadow-lg py-1 transition-all duration-200 origin-top ${
                  categoriesOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"
                }`}
                style={{ backgroundColor: "#1e1e1e", border: "1px solid #333" }}
              >
                {categories.map((cat) => (
                  <Link
                    key={cat.uid}
                    href={`/properties?category=${cat.title.toLowerCase()}`}
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    {cat.title}
                  </Link>
                ))}
              </div>
            </div>

            {endNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors duration-200 relative group"
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-3 right-3 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"
                  style={{ backgroundColor: "#e63946" }}
                />
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] group"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-[2px] bg-white transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-white transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-white transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-[500px] border-t border-gray-700" : "max-h-0"
        }`}
        style={{ backgroundColor: "#1e1e1e" }}
      >
        <div className="px-4 py-3 space-y-1">
          {staticNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-colors duration-200 text-sm border-b border-gray-800"
            >
              {link.label}
            </Link>
          ))}
          
          {/* Mobile Categories */}
          <div className="block px-3 py-2 text-gray-400 text-xs font-semibold uppercase tracking-wider border-b border-gray-800 mt-2">
            Categories
          </div>
          {categories.map((cat) => (
            <Link
              key={cat.uid}
              href={`/properties?category=${cat.title.toLowerCase()}`}
              onClick={() => setMobileOpen(false)}
              className="block px-6 py-2 text-gray-300 hover:text-white hover:bg-white/5 transition-colors duration-200 text-sm border-b border-gray-800"
            >
              {cat.title}
            </Link>
          ))}

          {endNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-colors duration-200 text-sm border-b border-gray-800 last:border-0 mt-2"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
