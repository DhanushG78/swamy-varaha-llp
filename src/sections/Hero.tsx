"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Hero = ({ data }: { data: any }) => {
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

  // Dynamically resolve background video URL
  let videoUrl = "/hero.mp4";
  if (data?.background_video) {
    if (Array.isArray(data.background_video)) {
      videoUrl = data.background_video[0]?.url || "/hero.mp4";
    } else if (typeof data.background_video === "object") {
      videoUrl = data.background_video.url || "/hero.mp4";
    } else if (typeof data.background_video === "string") {
      videoUrl = data.background_video;
    }
  }

  const heading = data?.cta_heading || data?.heading || "Easiest way to find your dream home";
  const subheading = data?.cta_description || data?.subheading || "";
  const btnText = data?.cta_button_text || "Search";
  const btnLink = data?.cta_button_link || "";

  // Diagnostic logging
  console.log(`[Hero Debug] Heading: "${heading}"`);
  console.log(`[Hero Debug] Button: "${btnText}"`);
  console.log(`[Hero Debug] Link: "${btnLink}"`);
  console.log(`[Hero Debug] Video: "${videoUrl}"`);

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
        key={videoUrl}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content — centered */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center max-w-4xl mx-auto">
        {/* H1 Headline */}
        <h1
          className="text-white font-medium mb-4 leading-tight"
          style={{ fontSize: "clamp(1.75rem, 5vw, 2.5rem)" }}
        >
          {heading}
        </h1>
        
        {subheading && (
          <p className="text-white/80 text-lg mb-8 max-w-2xl">{subheading}</p>
        )}

        {/* Render CTA Link Button if btnLink is defined; otherwise render Search Bar */}
        {btnLink ? (
          <Link
            href={btnLink}
            className="px-8 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:bg-[#d52b36] shadow-lg inline-block"
            style={{ backgroundColor: "#e63946" }}
          >
            {btnText}
          </Link>
        ) : (
          /* Search Bar */
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
              {btnText}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
