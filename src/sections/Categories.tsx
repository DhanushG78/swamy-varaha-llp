import Link from "next/link";

const categories = [
  {
    title: "Our Properties",
    description:
      "Browse our complete portfolio of premium homes, apartments, and luxury estates available across top locations.",
    href: "/properties",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: "Property for Sale",
    description:
      "Explore handpicked properties for sale with verified listings, transparent pricing, and expert guidance.",
    href: "/buy",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    title: "Real Estate Agent",
    description:
      "Connect with top-rated professional agents who bring expertise, integrity, and results to every transaction.",
    href: "/agents",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "House for Sale",
    description:
      "Find your perfect home from our curated collection of houses with modern amenities and prime locations.",
    href: "/buy",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" />
      </svg>
    ),
  },
];

const Categories = () => {
  return (
    <section style={{ backgroundColor: "#f8f9fa" }} className="py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((item) => (
            <div
              key={item.title}
              className="bg-white p-8 border border-gray-200 hover:shadow-lg transition-shadow duration-300 group"
            >
              {/* Icon */}
              <div
                className="mb-5 transition-colors duration-200"
                style={{ color: "#6c757d" }}
              >
                {item.icon}
              </div>

              {/* Title */}
              <h3
                className="text-base font-medium mb-3"
                style={{ color: "#343a40" }}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: "#6c757d" }}
              >
                {item.description}
              </p>

              {/* Link */}
              <Link
                href={item.href}
                className="text-sm font-medium transition-colors duration-200 group-hover:underline"
                style={{ color: "#e63946" }}
              >
                Learn More &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
