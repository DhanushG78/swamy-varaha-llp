import Link from "next/link";

const CTABanner = ({ data }: { data: any }) => {
  const heading = data?.heading || "Be a part of our growing real estate agents";
  const description = data?.description || "";
  const btnText = data?.button_text || "Apply for Real Estate agent";
  const btnLink = data?.button_link?.href || (typeof data?.button_link === "string" ? data.button_link : "/sell");

  return (
    <section style={{ backgroundColor: "#e63946" }}>
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-medium text-white">
            {heading}
          </h2>
          {description && (
            <p className="text-white/90 text-sm mt-2 max-w-xl">{description}</p>
          )}
        </div>
        <Link
          href={btnLink}
          className="inline-block px-8 py-3 bg-white font-medium text-sm transition-colors duration-200 hover:bg-gray-100 whitespace-nowrap"
          style={{ color: "#e63946" }}
        >
          {btnText}
        </Link>
      </div>
    </section>
  );
};

export default CTABanner;
