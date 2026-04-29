import PropertyCard from "@/components/PropertyCard";
import { getFeaturedProperties } from "@/lib/api";

const FeaturedProperties = async () => {
  const properties = await getFeaturedProperties();

  return (
    <section className="px-8 py-16">
      <h2 className="text-3xl font-bold mb-10">
        Featured Properties
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {properties.map((property: { uid: string; title: string; price: string; location: string; slug: string; images?: { url: string }[] }) => (
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
    </section>
  );
};

export default FeaturedProperties;
