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

export default async function RentPage() {
  const properties = (await getAllProperties()) as Property[];

  const rentProperties = properties.filter(
    (p) =>
      p.category?.[0]?.name?.toLowerCase() === "rent"
  );

  return (
    <main className="px-8 py-10 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">
        Rent Properties
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {rentProperties.map((property) => (
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
      {rentProperties.length === 0 && (
        <p className="text-gray-400 mt-10">No properties available for rent at the moment.</p>
      )}
    </main>
  );
}
