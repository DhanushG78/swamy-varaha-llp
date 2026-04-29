import PropertyCard from "@/components/PropertyCard";
import { getAllProperties } from "@/lib/api";

interface Property {
  uid: string;
  title: string;
  price: string;
  location: string;
  slug: string;
  images?: { url: string }[];
}

export default async function SearchPage() {
  const properties = (await getAllProperties()) as Property[] || [];

  return (
    <main className="px-8 py-12 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-4xl md:text-5xl font-bold mb-10 tracking-tight">
        Search Properties
      </h1>

      {/* Filter UI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <input
          type="text"
          placeholder="Search by location"
          className="p-4 rounded-xl bg-[#111] border border-gray-800 focus:border-gray-600 transition outline-none text-white shadow-inner"
        />

        <select
          className="p-4 rounded-xl bg-[#111] border border-gray-800 focus:border-gray-600 transition outline-none text-white appearance-none cursor-pointer"
        >
          <option>All Categories</option>
          <option>Buy</option>
          <option>Rent</option>
          <option>Villas</option>
          <option>Apartments</option>
        </select>

        <select
          className="p-4 rounded-xl bg-[#111] border border-gray-800 focus:border-gray-600 transition outline-none text-white appearance-none cursor-pointer"
        >
          <option>Price Range</option>
          <option>Under ₹1 Cr</option>
          <option>₹1 Cr - ₹3 Cr</option>
          <option>Above ₹3 Cr</option>
        </select>
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-32 bg-[#050505] rounded-3xl border border-dashed border-gray-800">
          <h2 className="text-2xl font-semibold text-gray-300">
            No properties found
          </h2>
          <p className="text-gray-500 mt-2">
            Try adjusting your filters or check back later
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {properties.map((property) => (
            <PropertyCard
              key={property.uid}
              title={property.title}
              price={property.price}
              location={property.location}
              slug={property.slug}
              image={
                property.images?.[0]?.url ||
                "/fallback-property.jpg"
              }
            />
          ))}
        </div>
      )}
    </main>
  );
}
