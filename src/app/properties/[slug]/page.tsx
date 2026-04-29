import { getPropertyBySlug } from "@/lib/api";

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    return (
      <main className="px-8 py-20 text-center">
        <h1 className="text-4xl font-bold text-red-500">Property Not Found</h1>
        <p className="text-gray-400 mt-4">The property you are looking for does not exist.</p>
      </main>
    );
  }

  return (
    <main className="px-8 py-10 space-y-10 max-w-6xl mx-auto">
      {/* Title & Info */}
      <section>
        <h1 className="text-4xl font-bold">{property.title}</h1>
        <p className="text-gray-400 mt-2">{property.location}</p>
        <p className="text-2xl font-semibold mt-4 text-accent">{property.price}</p>
      </section>

      {/* Main Image */}
      <section>
        <img
          src={property.images?.[0]?.url || "/fallback-property.jpg"}
          alt={property.title}
          className="w-full h-[600px] object-cover rounded-2xl shadow-2xl"
        />
      </section>

      {/* Description */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Description</h2>
        <div className="text-gray-300 leading-relaxed text-lg">
          {property.description}
        </div>
      </section>

      {/* Property Video Section */}
      {property.video_url && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Property Video Tour</h2>
          <div className="aspect-video w-full overflow-hidden rounded-2xl shadow-xl">
            <iframe
              width="100%"
              height="100%"
              src={property.video_url.replace("watch?v=", "embed/")}
              title="Property Video"
              className="rounded-xl"
              allowFullScreen
            />
          </div>
        </section>
      )}

      {/* Agent Section */}
      {property.agent && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Agent Information</h2>
          <div className="bg-[#111] p-8 rounded-2xl border border-gray-800 shadow-lg">
            <h3 className="text-2xl font-semibold">{property.agent.name}</h3>
            <p className="text-accent font-medium mt-1">{property.agent.specialization}</p>
            <p className="text-gray-400 mt-4 italic">&ldquo;{property.agent.bio}&rdquo;</p>
            <div className="mt-6 flex flex-wrap gap-6 text-gray-300">
              <p>📧 {property.agent.email}</p>
              <p>📞 {property.agent.phone}</p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
