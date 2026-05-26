import Link from "next/link";

const CTABanner = ({ data }: { data: any }) => {
  const heading = data?.heading || "Be a part of our growing real estate agents";
  const description = data?.description || "";
  const btnText = data?.button_text || "Apply for Real Estate agent";
  const btnLink = data?.button_link?.href || (typeof data?.button_link === "string" ? data.button_link : "/sell");
  const bgVideo = data?.background_video?.url || "";

  // Step 5: Add runtime debug visibility
  console.log(`[CTA Debug] Heading: "${heading}"`);
  console.log(`[CTA Debug] Button: "${btnText}"`);

  if (bgVideo) {
    return (
      <section className="relative overflow-hidden min-h-[320px] md:min-h-[240px] flex items-center">
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30 md:from-black/75 md:to-black/40 z-10" />

        {/* Content Wrapper */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-medium text-white tracking-tight">
              {heading}
            </h2>
            {description && (
              <p className="text-white/80 text-sm md:text-base mt-2 max-w-xl leading-relaxed">
                {description}
              </p>
            )}
          </div>
          <Link
            href={btnLink}
            className="inline-block px-8 py-3 bg-white font-medium text-sm transition-all duration-300 hover:bg-gray-100 hover:scale-[1.02] shadow-lg whitespace-nowrap z-30"
            style={{ color: "#e63946" }}
          >
            {btnText}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section style={{ backgroundColor: "#e63946" }} className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-medium text-white tracking-tight">
            {heading}
          </h2>
          {description && (
            <p className="text-white/90 text-sm md:text-base mt-2 max-w-xl leading-relaxed">
              {description}
            </p>
          )}
        </div>
        <Link
          href={btnLink}
          className="inline-block px-8 py-3 bg-white font-medium text-sm transition-all duration-300 hover:bg-gray-100 hover:scale-[1.02] shadow-lg whitespace-nowrap"
          style={{ color: "#e63946" }}
        >
          {btnText}
        </Link>
      </div>
    </section>
  );
};

export default CTABanner;
