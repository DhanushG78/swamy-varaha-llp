"use client";

import Link from "next/link";
import { trackCTAClick } from "@/lib/personalize/events";

const CTABanner = ({ data, isHero = false }: { data: any; isHero?: boolean }) => {
  const heading = data?.cta_heading || data?.heading || "Be a part of our growing real estate agents";
  const description = data?.cta_description || data?.description || "";
  const btnText = data?.cta_button_text || data?.button_text || "Apply for Real Estate agent";
  const rawLink = data?.cta_button_link || data?.button_link;
  const btnLink = rawLink?.href || (typeof rawLink === "string" ? rawLink : "/sell");

  // Dynamically resolve Contentstack asset background video structure
  let bgVideo = "";
  if (data?.background_video) {
    if (Array.isArray(data.background_video)) {
      bgVideo = data.background_video[0]?.url || "";
    } else if (typeof data.background_video === "object") {
      bgVideo = data.background_video.url || "";
    } else if (typeof data.background_video === "string") {
      bgVideo = data.background_video;
    }
  }

  // Diagnostic logging
  console.log('[CTA VIDEO DEBUG] Raw CTA Payload:', JSON.stringify(data, null, 2));
  console.log('[CTA VIDEO DEBUG] Background Video Field:', data?.background_video);
  console.log('[CTA VIDEO DEBUG] Background Video URL:', bgVideo);

  if (bgVideo) {
    return (
      <section 
        className="relative overflow-hidden flex items-center justify-center"
        style={isHero ? { height: "100vh", marginTop: "-4rem" } : {}}
      >
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={bgVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Premium Overlay for Contrast & Text Readability */}
        <div 
          className={`absolute inset-0 z-10 ${
            isHero 
              ? "bg-black/55" 
              : "bg-gradient-to-r from-black/80 via-black/60 to-black/30 md:from-black/75 md:to-black/40"
          }`} 
        />

        {/* Content Wrapper */}
        <div 
          className={`relative z-20 w-full mx-auto px-6 ${
            isHero 
              ? "max-w-4xl flex flex-col items-center justify-center text-center gap-6 md:gap-8" 
              : "max-w-7xl py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-6"
          }`}
        >
          <div className={isHero ? "text-center" : "text-center md:text-left"}>
            <h2 
              className={`font-medium text-white tracking-tight leading-tight ${
                isHero ? "text-3xl md:text-5xl" : "text-2xl md:text-3xl"
              }`}
            >
              {heading}
            </h2>
            {description && (
              <p 
                className={`text-white/80 mt-2 leading-relaxed ${
                  isHero ? "text-base md:text-lg max-w-2xl mt-4" : "text-sm md:text-base max-w-xl"
                }`}
              >
                {description}
              </p>
            )}
          </div>
          <Link
            href={btnLink}
            onClick={() => trackCTAClick(btnText, btnLink)}
            className="inline-block px-8 py-3 bg-white font-medium text-sm transition-all duration-300 hover:bg-gray-100 hover:scale-[1.02] shadow-lg whitespace-nowrap z-30"
            style={{ color: "#0a2240" }}
          >
            {btnText}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section 
      style={isHero ? { backgroundColor: "#0a2240", height: "100vh", marginTop: "-4rem" } : { backgroundColor: "#0a2240" }} 
      className={isHero ? "flex items-center justify-center" : "py-12 md:py-16"}
    >
      <div 
        className={`mx-auto px-6 ${
          isHero 
            ? "max-w-4xl flex flex-col items-center justify-center text-center gap-6 md:gap-8" 
            : "max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6"
        }`}
      >
        <div className={isHero ? "text-center" : "text-center md:text-left"}>
          <h2 
            className={`font-medium text-white tracking-tight leading-tight ${
              isHero ? "text-3xl md:text-5xl" : "text-2xl md:text-3xl"
            }`}
          >
            {heading}
          </h2>
          {description && (
            <p 
              className={`text-white/95 mt-2 leading-relaxed ${
                isHero ? "text-base md:text-lg max-w-2xl mt-4" : "text-sm md:text-base max-w-xl"
              }`}
            >
              {description}
            </p>
          )}
        </div>
        <Link
          href={btnLink}
          onClick={() => trackCTAClick(btnText, btnLink)}
          className="inline-block px-8 py-3 bg-white font-medium text-sm transition-all duration-300 hover:bg-gray-100 hover:scale-[1.02] shadow-lg whitespace-nowrap"
          style={{ color: "#0a2240" }}
        >
          {btnText}
        </Link>
      </div>
    </section>
  );
};

export default CTABanner;
