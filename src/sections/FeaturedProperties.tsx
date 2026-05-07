import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import { getFeaturedProperties } from "@/lib/api";

type Property = {
  uid: string;
  title: string;
  price: string;
  location: string;
  slug: string;
  beds?: string | number;
  baths?: string | number;
  images?: { url: string }[];
};

const FeaturedProperties = async ({ searchParams }: { searchParams?: any }) => {
  const properties = (await getFeaturedProperties(searchParams)) as Property[];

  if (!properties || properties.length === 0) {
    return (
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center py-16 border border-dashed border-gray-300">
          <h2 className="text-xl font-medium" style={{ color: "#343a40" }}>
            No featured properties at the moment
          </h2>
          <p className="text-sm mt-2" style={{ color: "#6c757d" }}>
            Please check back later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <h2
            className="text-2xl font-medium"
            style={{ color: "#343a40" }}
          >
            Popular Properties
          </h2>
          <Link
            href="/properties"
            className="text-sm font-medium hidden md:inline-block transition-colors duration-200"
            style={{ color: "#e63946" }}
          >
            View all properties &rarr;
          </Link>
        </div>

        {/* Property Grid — 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property.uid}
              title={property.title}
              price={property.price}
              location={property.location}
              slug={property.slug}
              beds={property.beds}
              baths={property.baths}
              image={property.images?.[0]?.url || "/fallback-property.jpg"}
            />
          ))}
        </div>

        {/* Mobile link */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/properties"
            className="text-sm font-medium"
            style={{ color: "#e63946" }}
          >
            View all properties &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
