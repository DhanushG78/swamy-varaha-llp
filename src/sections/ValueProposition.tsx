const ValueProposition = () => {
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
              Let&apos;s find home that&apos;s perfect for you
            </h2>

            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "#6c757d" }}
            >
              We help you find the ideal property by connecting you with trusted agents,
              verified listings, and exclusive market insights. Our platform is built on
              trust, transparency, and a passion for real estate.
            </p>

            {/* Icon callouts */}
            <div className="space-y-5">
              <div className="flex items-start gap-4">
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
                    2M Properties
                  </h4>
                  <p className="text-sm" style={{ color: "#6c757d" }}>
                    Access our vast database of over 2 million properties worldwide.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0"
                  style={{ backgroundColor: "#e63946" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium" style={{ color: "#343a40" }}>
                    Top Rated Agents
                  </h4>
                  <p className="text-sm" style={{ color: "#6c757d" }}>
                    Work with experienced, highly rated professionals in the industry.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0"
                  style={{ backgroundColor: "#e63946" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium" style={{ color: "#343a40" }}>
                    Legit Properties
                  </h4>
                  <p className="text-sm" style={{ color: "#6c757d" }}>
                    Every listing is verified to ensure legitimacy and full transparency.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Column */}
          <div className="img-zoom rounded-sm overflow-hidden">
            <img
              src="/p1.jpg"
              alt="Modern luxury home interior"
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
