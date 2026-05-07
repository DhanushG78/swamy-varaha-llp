import { getAboutPage, getAchievements } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function AboutPage(props: { searchParams: Promise<any> }) {
  const searchParams = await props.searchParams;
  const about = await getAboutPage(searchParams);
  const achievements = await getAchievements(searchParams);

  if (!about) {
    return (
      <main className="px-6 py-20 text-center" style={{ color: "#6c757d" }}>
        About page content not found.
      </main>
    );
  }

  return (
    <main>
      {/* Page Header */}
      <div style={{ backgroundColor: "#1e1e1e" }} className="py-16 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h1
            className="font-medium text-white"
            style={{ fontSize: "clamp(1.75rem, 5vw, 2rem)" }}
          >
            {about.title}
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Our Story */}
        <section>
          <h2
            className="text-2xl font-medium mb-5"
            style={{ color: "#343a40" }}
          >
            Our Story
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "#6c757d" }}>
            {about.our_story}
          </p>
        </section>

        {/* Mission + Vision */}
        <section className="grid md:grid-cols-2 gap-6">
          <div
            className="p-8 border border-gray-200 shadow-sm"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <h3
              className="text-lg font-medium mb-4"
              style={{ color: "#343a40" }}
            >
              Mission
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#6c757d" }}>
              {about.mission}
            </p>
          </div>

          <div
            className="p-8 border border-gray-200 shadow-sm"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <h3
              className="text-lg font-medium mb-4"
              style={{ color: "#343a40" }}
            >
              Vision
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#6c757d" }}>
              {about.vision}
            </p>
          </div>
        </section>

        {/* Company Video */}
        {about.company_video_url && (
          <section>
            <h2
              className="text-2xl font-medium mb-5"
              style={{ color: "#343a40" }}
            >
              Company Introduction
            </h2>
            <div className="aspect-video w-full overflow-hidden shadow-sm border border-gray-200">
              <iframe
                width="100%"
                height="100%"
                src={about.company_video_url.replace("watch?v=", "embed/")}
                className="border-0"
                allowFullScreen
                title="Company Video"
              />
            </div>
          </section>
        )}

        {/* Achievements */}
        {achievements && achievements.length > 0 && (
          <section>
            <h2
              className="text-2xl font-medium mb-8"
              style={{ color: "#343a40" }}
            >
              Our Achievements
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {achievements.map((item: any) => (
                <div
                  key={item.uid}
                  className="bg-white p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <div
                    className="text-xs font-bold uppercase tracking-wider mb-2"
                    style={{ color: "#e63946" }}
                  >
                    {item.year}
                  </div>
                  <h3
                    className="text-base font-medium mb-2"
                    style={{ color: "#343a40" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6c757d" }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
