import FeaturedProperties from "@/sections/FeaturedProperties";

export default function PropertiesPage() {
  return (
    <main>
      <section className="px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">
          All Properties
        </h1>

        <FeaturedProperties />
      </section>
    </main>
  );
}
