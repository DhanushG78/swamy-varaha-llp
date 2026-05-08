const ValueProposition = ({ data }: { data: any }) => {
  const heading = data?.heading || "Let's find home that's perfect for you";
  const description = data?.description || "We help you find the ideal property by connecting you with trusted agents, verified listings, and exclusive market insights. Our platform is built on trust, transparency, and a passion for real estate.";
  const imageUrl = data?.image?.url || "/p1.jpg";
  const stats = data?.stats || [];

  // Default stats fallback to preserve UI if none provided by CMS
  const defaultStats = [
    { stat_number: "2M+", stat_label: "Properties Worldwide" },
    { stat_number: "Top Rated", stat_label: "Professional Agents" },
    { stat_number: "100%", stat_label: "Legit Properties" }
  ];

  const displayStats = stats.length > 0 ? stats : defaultStats;

  return (
    <section className="py-16 md:py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Column */}
          <div>
            <h2
              className="text-2xl font-medium mb-5 leading-tight"
              style={{ color: "#343a40" }}
            >
              {heading}
            </h2>

            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "#6c757d" }}
            >
              {description}
            </p>

            {/* Icon callouts */}
            <div className="space-y-5">
              {displayStats.map((stat: any, i: number) => (
                <div key={i} className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0"
                    style={{ backgroundColor: "#e63946" }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium" style={{ color: "#343a40" }}>
                      {stat.stat_number}
                    </h4>
                    <p className="text-sm" style={{ color: "#6c757d" }}>
                      {stat.stat_label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Column */}
          <div className="img-zoom rounded-sm overflow-hidden">
            <img
              src={imageUrl}
              alt={heading}
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
