"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const ValueProposition = ({ data }: { data: any }) => {
  const heading = data?.heading || "";
  const description = data?.description || "";
  const stats = data?.stats || [];

  // Resolve images
  let imageUrls: string[] = [];
  if (data?.image) {
    if (Array.isArray(data.image)) {
      imageUrls = data.image.map((img: any) => img?.url).filter(Boolean);
    } else if (typeof data.image === "object" && data.image.url) {
      imageUrls = [data.image.url];
    } else if (typeof data.image === "string") {
      imageUrls = [data.image];
    }
  }

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (imageUrls.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % imageUrls.length);
    }, 4000); // Crossfade every 4 seconds
    return () => clearInterval(interval);
  }, [imageUrls.length]);

  if (!heading && !description && imageUrls.length === 0 && stats.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Column */}
          <div>
            {heading && (
              <h2
                className="text-2xl font-medium mb-5 leading-tight"
                style={{ color: "#343a40" }}
              >
                {heading}
              </h2>
            )}

            {description && (
              <div
                className="text-base leading-relaxed mb-8"
                style={{ color: "#6c757d" }}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}

            {/* Enterprise Stats Grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 mt-10 pt-6 border-t border-gray-100">
              {stats.map((stat: any, i: number) => (
                <div key={i} className="flex flex-col border-l-[3px] pl-4 border-[#0a2240]/20 hover:border-[#0a2240] transition-colors duration-300">
                  <h4 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
                    {stat.stat_number}
                  </h4>
                  <p className="text-[13px] uppercase tracking-wider font-medium text-gray-500 mt-1.5">
                    {stat.stat_label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image Column */}
          <div className="img-zoom rounded-sm overflow-hidden relative w-full h-[400px] md:h-[500px]">
            {imageUrls.map((url, idx) => (
              <Image
                key={url}
                src={url}
                alt={heading || "Value Proposition Image"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`object-cover transition-opacity duration-1000 absolute inset-0 ${
                  idx === activeIndex ? "opacity-100" : "opacity-0"
                }`}
                priority={idx === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
