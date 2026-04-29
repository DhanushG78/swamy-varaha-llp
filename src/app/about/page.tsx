import { getAboutPage, getAchievements } from "@/lib/api";

export default async function AboutPage() {
  const about = await getAboutPage();
  const achievements = await getAchievements();

  if (!about) {
    return <main className="px-8 py-20 text-center text-gray-400">About page content not found.</main>;
  }

  return (
    <main className="px-8 py-10 space-y-16 max-w-6xl mx-auto">
      {/* Hero */}
      <section>
        <h1 className="text-5xl font-bold tracking-tight">
          {about.title}
        </h1>
      </section>

      {/* Our Story */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-accent">
          Our Story
        </h2>
        <div className="text-gray-300 leading-relaxed text-lg">
          {about.our_story}
        </div>
      </section>

      {/* Mission + Vision */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="bg-[#111] p-8 rounded-2xl border border-gray-800 shadow-lg">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-8 bg-white rounded-full"></span>
            Mission
          </h3>
          <p className="text-gray-400 leading-relaxed">{about.mission}</p>
        </div>

        <div className="bg-[#111] p-8 rounded-2xl border border-gray-800 shadow-lg">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-8 bg-white rounded-full"></span>
            Vision
          </h3>
          <p className="text-gray-400 leading-relaxed">{about.vision}</p>
        </div>
      </section>

      {/* Company Video */}
      {about.company_video_url && (
        <section>
          <h2 className="text-3xl font-bold mb-6">
            Company Introduction
          </h2>
          <div className="aspect-video w-full overflow-hidden rounded-2xl shadow-2xl">
            <iframe
              width="100%"
              height="100%"
              src={about.company_video_url.replace("watch?v=", "embed/")}
              className="rounded-xl"
              allowFullScreen
              title="Company Video"
            />
          </div>
        </section>
      )}

      {/* Achievements */}
      {achievements && achievements.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-10">
            Our Achievements
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((item: any) => (
              <div
                key={item.uid}
                className="bg-[#111] p-8 rounded-2xl border border-gray-800 shadow-lg hover:border-gray-600 transition"
              >
                <div className="text-accent text-lg font-bold mb-2">
                  {item.year}
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
