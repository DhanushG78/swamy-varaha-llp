import Link from "next/link";

const DefaultIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const Categories = ({ data }: { data: any }) => {
  const title = data?.section_title || "Categories";
  const categoriesList = data?.categories || [];

  if (!categoriesList.length) return null;

  return (
    <section style={{ backgroundColor: "#f8f9fa" }} className="py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-medium mb-10" style={{ color: "#343a40" }}>
          {title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoriesList.map((item: any, i: number) => {
            const catTitle = item.title || "Category";
            const catDesc = item.description || "";
            const slug = (item.slug || item.title || item.name || "properties").toLowerCase();
            
            return (
              <div
                key={item.uid || i}
                className="bg-white p-8 border border-gray-200 hover:shadow-lg transition-shadow duration-300 group"
              >
                <div
                  className="mb-5 transition-colors duration-200"
                  style={{ color: "#6c757d" }}
                >
                  <DefaultIcon />
                </div>
                <h3
                  className="text-base font-medium mb-3"
                  style={{ color: "#343a40" }}
                >
                  {catTitle}
                </h3>
  
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: "#6c757d" }}
                >
                  {catDesc}
                </p>
  
                <Link
                  href={`/properties?category=${slug}`}
                  className="text-sm font-medium transition-colors duration-200 group-hover:underline"
                  style={{ color: "#0a2240" }}
                >
                  Learn More &rarr;
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
