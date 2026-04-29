import { getPropertyBySlug } from "@/lib/api";
import Link from "next/link";
import ImageSlider from "@/components/ImageSlider";

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    return (
      <main className="px-6 py-20 text-center">
        <h1 className="text-2xl font-medium" style={{ color: "#e63946" }}>
          Property Not Found
        </h1>
        <p className="text-sm mt-3" style={{ color: "#6c757d" }}>
          The property you are looking for does not exist.
        </p>
        <Link
          href="/properties"
          className="inline-block mt-6 px-6 py-3 text-sm font-medium text-white"
          style={{ backgroundColor: "#e63946" }}
        >
          Browse Properties
        </Link>
      </main>
    );
  }

  return (
    <main>
      {/* Page Header */}
      <div style={{ backgroundColor: "#1e1e1e" }} className="py-16 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h1
            className="font-medium text-white mb-2"
            style={{ fontSize: "clamp(1.75rem, 5vw, 2rem)" }}
          >
            {property.title}
          </h1>
          <p className="text-sm text-gray-400">{property.location}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
        {/* Price */}
        <div>
          <span
            className="text-2xl font-medium"
            style={{ color: "#e63946" }}
          >
            {property.price}
          </span>
        </div>

        {/* Image Slider */}
        <ImageSlider
          images={property.images || []}
          alt={property.title}
        />

        {/* Description */}
        <section className="border-t border-gray-200 pt-8">
          <h2
            className="text-xl font-medium mb-4"
            style={{ color: "#343a40" }}
          >
            Property Description
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "#6c757d" }}>
            {property.description}
          </p>
        </section>

        {/* Property Video */}
        {property.video_url && (
          <section className="border-t border-gray-200 pt-8">
            <h2
              className="text-xl font-medium mb-4"
              style={{ color: "#343a40" }}
            >
              Property Video Tour
            </h2>
            <div className="aspect-video w-full overflow-hidden shadow-sm border border-gray-200">
              <iframe
                width="100%"
                height="100%"
                src={property.video_url.replace("watch?v=", "embed/")}
                title="Property Video"
                className="border-0"
                allowFullScreen
              />
            </div>
          </section>
        )}

        {/* Agent Section */}
        {property.agent && (Array.isArray(property.agent) ? property.agent[0] : property.agent) && (() => {
          const agent = Array.isArray(property.agent) ? property.agent[0] : property.agent;
          return (
            <section className="border-t border-gray-200 pt-8">
              <h2
                className="text-xl font-medium mb-4"
                style={{ color: "#343a40" }}
              >
                Listing Agent
              </h2>
              <div
                className="p-8 border border-gray-200 shadow-sm"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <h3 className="text-lg font-medium mb-1" style={{ color: "#343a40" }}>
                  {agent.name}
                </h3>
                <p
                  className="text-xs font-bold uppercase tracking-wider mb-3"
                  style={{ color: "#e63946" }}
                >
                  {agent.specialization}
                </p>
                {agent.bio && (
                  <p className="text-sm leading-relaxed mb-4 italic" style={{ color: "#6c757d" }}>
                    &ldquo;{agent.bio}&rdquo;
                  </p>
                )}
                <div className="flex flex-wrap gap-6 text-sm" style={{ color: "#343a40" }}>
                  {agent.email && <p>Email: {agent.email}</p>}
                  {agent.phone && <p>Phone: {agent.phone}</p>}
                </div>
              </div>
            </section>
          );
        })()}

        {/* Back Link */}
        <div className="pt-4">
          <Link
            href="/properties"
            className="text-sm font-medium transition-colors duration-200"
            style={{ color: "#e63946" }}
          >
            &larr; Back to all properties
          </Link>
        </div>
      </div>
    </main>
  );
}
