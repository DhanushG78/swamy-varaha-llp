"use client";

const AchievementSection = ({ data }: { data: any }) => {
  const title = data?.section_title || "Our Achievements";
  const achievements = data?.achievements;

  if (!achievements || !achievements.length) return null;

  return (
    <section className="py-16 md:py-24 bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-6">
        {title && (
          <h2 className="text-3xl md:text-4xl font-medium text-white mb-16 text-center tracking-tight animate-fade-in-up">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {achievements.map((achiev: any, i: number) => {
            const year = achiev.year;
            const heading = achiev.title;
            const description = achiev.description;
            // Support both object and string for image
            const imageUrl = typeof achiev.image === "string"
              ? achiev.image
              : (achiev.image?.url || null);

            return (
              <div
                key={achiev.uid || i}
                className="group relative bg-[#262626] border border-white/5 rounded-xl p-8 hover:border-white/20 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex flex-col h-full animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Image / Icon Header */}
                {imageUrl && (
                  <div className="mb-6 w-16 h-16 flex items-center justify-center rounded-lg bg-white/5 p-2 group-hover:bg-white/10 transition-colors duration-300 overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={heading || "Achievement image"}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Year Badge */}
                {year && (
                  <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white bg-white/10 rounded-full w-fit mb-4">
                    {year}
                  </span>
                )}

                {/* Title */}
                {heading && (
                  <h3 className="text-xl font-semibold text-white mb-3 transition-colors duration-300 leading-snug">
                    {heading}
                  </h3>
                )}

                {/* Description */}
                {description && (
                  <div
                    className="text-sm text-gray-400 leading-relaxed mt-2"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                )}

                {/* Decorative hover gradient border effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AchievementSection;
