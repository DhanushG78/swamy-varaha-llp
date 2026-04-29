"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import PropertyCard from "@/components/PropertyCard";

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

/**
 * Parse a price string like "$1,291,000" or "₹2.5 Cr" into a numeric value.
 * Returns 0 if parsing fails.
 */
function parsePrice(priceStr: string): number {
  if (!priceStr) return 0;
  // Remove currency symbols and commas
  const cleaned = priceStr.replace(/[^0-9.]/g, "");
  const num = parseFloat(cleaned);
  if (isNaN(num)) return 0;

  // Handle Cr / Lakh notations
  const lower = priceStr.toLowerCase();
  if (lower.includes("cr")) return num * 10_000_000;
  if (lower.includes("lakh") || lower.includes("lac")) return num * 100_000;
  if (lower.includes("m") && !lower.includes("mr")) return num * 1_000_000;
  if (lower.includes("k")) return num * 1_000;

  return num;
}

/**
 * Get the category name from a property, handling both array and object reference formats.
 */
function getCategoryName(property: Property): string {
  if (!property.category) return "";
  if (Array.isArray(property.category)) {
    return property.category[0]?.name?.toLowerCase() || "";
  }
  return (property.category as { name: string }).name?.toLowerCase() || "";
}

type PriceRange = "" | "under500k" | "500k-1m" | "1m-3m" | "above3m";

const PRICE_RANGES: { label: string; value: PriceRange }[] = [
  { label: "All Price Ranges", value: "" },
  { label: "Under $500K", value: "under500k" },
  { label: "$500K - $1M", value: "500k-1m" },
  { label: "$1M - $3M", value: "1m-3m" },
  { label: "Above $3M", value: "above3m" },
];

function matchesPriceRange(price: number, range: PriceRange): boolean {
  switch (range) {
    case "under500k":
      return price < 500_000;
    case "500k-1m":
      return price >= 500_000 && price < 1_000_000;
    case "1m-3m":
      return price >= 1_000_000 && price < 3_000_000;
    case "above3m":
      return price >= 3_000_000;
    default:
      return true;
  }
}

type Props = {
  properties: Property[];
};

export default function SearchFilter({ properties }: Props) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState<PriceRange>("");

  // Extract unique categories from the data
  const categories = useMemo(() => {
    const set = new Set<string>();
    properties.forEach((p) => {
      const name = getCategoryName(p);
      if (name) set.add(name);
    });
    return Array.from(set).sort();
  }, [properties]);

  // Filter properties
  const filtered = useMemo(() => {
    return properties.filter((p) => {
      // Text search — match against title, location, or slug
      const q = query.toLowerCase().trim();
      if (q) {
        const matchesText =
          p.title?.toLowerCase().includes(q) ||
          p.location?.toLowerCase().includes(q) ||
          p.slug?.toLowerCase().includes(q);
        if (!matchesText) return false;
      }

      // Category filter
      if (category) {
        const catName = getCategoryName(p);
        if (catName !== category.toLowerCase()) return false;
      }

      // Price range filter
      if (priceRange) {
        const numericPrice = parsePrice(p.price);
        if (!matchesPriceRange(numericPrice, priceRange)) return false;
      }

      return true;
    });
  }, [properties, query, category, priceRange]);

  const handleReset = () => {
    setQuery("");
    setCategory("");
    setPriceRange("");
  };

  return (
    <div>
      {/* Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search by name or location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-3 text-sm bg-white border border-gray-200 outline-none transition-colors duration-200 focus:border-gray-400"
          style={{ color: "#343a40" }}
        />

        {/* Category dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-3 text-sm bg-white border border-gray-200 outline-none appearance-none cursor-pointer transition-colors duration-200 focus:border-gray-400"
          style={{ color: "#343a40" }}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        {/* Price range dropdown */}
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value as PriceRange)}
          className="px-4 py-3 text-sm bg-white border border-gray-200 outline-none appearance-none cursor-pointer transition-colors duration-200 focus:border-gray-400"
          style={{ color: "#343a40" }}
        >
          {PRICE_RANGES.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>

        {/* Reset button */}
        <button
          onClick={handleReset}
          className="px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:opacity-90 cursor-pointer"
          style={{ backgroundColor: "#e63946" }}
        >
          Reset Filters
        </button>
      </div>

      {/* Active filter count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm" style={{ color: "#6c757d" }}>
          Showing <span className="font-medium" style={{ color: "#343a40" }}>{filtered.length}</span>{" "}
          of {properties.length} properties
          {(query || category || priceRange) && (
            <span> &mdash; filters active</span>
          )}
        </p>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-gray-300">
          <h2 className="text-xl font-medium" style={{ color: "#343a40" }}>
            No properties found
          </h2>
          <p className="text-sm mt-2" style={{ color: "#6c757d" }}>
            Try adjusting your filters or check back later
          </p>
          {(query || category || priceRange) && (
            <button
              onClick={handleReset}
              className="mt-4 px-5 py-2 text-sm font-medium text-white transition-colors duration-200 cursor-pointer"
              style={{ backgroundColor: "#e63946" }}
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((property) => (
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
  );
}
