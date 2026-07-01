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

            {/* Icon callouts */}
            <div className="space-y-5">
              {stats.map((stat: any, i: number) => (
                <div key={i} className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0"
                    style={{ backgroundColor: "#e63946" }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium" style={{ color: "#343a40" }}>
                      {stat.stat_number}
                    </h4>
                    <p className="text-sm" style={{ color: "#6c757d" }}>
                      {stat.stat_label}
                    </p>
                  </div>
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
