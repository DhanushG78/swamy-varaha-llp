"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Hero = ({ videoUrl }: { videoUrl?: string }) => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const q = query.trim();
    if (q) {
      router.push(`/properties?q=${encodeURIComponent(q)}`);
    } else {
      router.push("/properties");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <section
      className="relative w-full flex items-center justify-center"
      style={{ height: "100vh", marginTop: "-4rem" }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        key={videoUrl || "/hero.mp4"}
      >
        <source src={videoUrl || "/hero.mp4"} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content — centered */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center max-w-4xl mx-auto">
        {/* H1 Headline */}
        <h1
          className="text-white font-medium mb-8 leading-tight"
          style={{ fontSize: "clamp(1.75rem, 5vw, 2rem)" }}
        >
          Easiest way to find your dream home
        </h1>

        {/* Search Bar */}
        <div className="flex w-full max-w-xl">
          <input
            type="text"
            placeholder="Search for a property..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-5 py-3 text-sm outline-none border-0"
            style={{ backgroundColor: "#ffffff", color: "#343a40" }}
          />
          <button
            onClick={handleSearch}
            className="px-6 py-3 text-sm font-medium text-white transition-colors duration-200 cursor-pointer"
            style={{ backgroundColor: "#e63946" }}
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
