import PropertyCard from "@/components/PropertyCard";
import { getAllProperties } from "@/lib/api";

interface Property {
  uid: string;
  title: string;
  price: string;
  location: string;
  slug: string;
  beds?: string | number;
  baths?: string | number;
  images?: { url: string }[];
  category?: { name: string }[];
}

export default async function RentPage() {
  const properties = (await getAllProperties()) as Property[];

  const rentProperties = properties.filter(
    (p) => p.category?.[0]?.name?.toLowerCase() === "rent"
  );

  return (
    <main>
      {/* Page Header */}
      <div style={{ backgroundColor: "#1e1e1e" }} className="py-16 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h1
            className="font-medium text-white"
            style={{ fontSize: "clamp(1.75rem, 5vw, 2rem)" }}
          >
            Rent Properties
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {rentProperties.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-gray-300">
            <h2 className="text-xl font-medium" style={{ color: "#343a40" }}>
              No properties available for rent
            </h2>
            <p className="text-sm mt-2" style={{ color: "#6c757d" }}>
              Please check back later or explore other categories.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rentProperties.map((property) => (
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
        )}
      </div>
    </main>
  );
}
