import PropertyCard from "@/components/PropertyCard";
import { getAllProperties } from "@/lib/api";

interface Property {
  uid: string;
  title: string;
  price: string;
  location: string;
  slug: string;
  images?: { url: string }[];
  category?: { name: string }[];
}

export default async function BuyPage() {
  const properties = (await getAllProperties()) as Property[];

  const buyProperties = properties.filter(
    (p) =>
      p.category?.[0]?.name?.toLowerCase() === "buy"
  );

  return (
    <main className="px-8 py-10 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">
        Buy Properties
      </h1>

      {buyProperties.length === 0 ? (
        <div className="text-center py-24 bg-[#050505] rounded-3xl border border-dashed border-gray-800">
          <h2 className="text-2xl font-semibold text-gray-300">
            No properties found for sale
          </h2>
          <p className="text-gray-500 mt-2">
            Please check back later or explore other categories.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {buyProperties.map((property) => (
            <PropertyCard
              key={property.uid}
              title={property.title}
              price={property.price}
              location={property.location}
              slug={property.slug}
              image={property.images?.[0]?.url || "/fallback-property.jpg"}
            />
          ))}
        </div>
      )}
    </main>
  );
}
