import { getAllProperties } from "@/lib/api";
import SearchFilter from "@/components/SearchFilter";
import { Suspense } from "react";

interface Property {
  uid: string;
  title: string;
  price: string;
  location: string;
  slug: string;
  beds?: string | number;
  baths?: string | number;
  images?: { url: string }[];
  category?: { name: string }[] | { name: string };
}

export default async function SearchPage() {
  const properties = ((await getAllProperties()) as Property[]) || [];

  return (
    <main>
      {/* Page Header */}
      <div style={{ backgroundColor: "#1e1e1e" }} className="py-16 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h1
            className="font-medium text-white"
            style={{ fontSize: "clamp(1.75rem, 5vw, 2rem)" }}
          >
            Search Properties
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <Suspense fallback={<div className="text-sm" style={{ color: "#6c757d" }}>Loading filters...</div>}>
          <SearchFilter properties={properties} />
        </Suspense>
      </div>
    </main>
  );
}
