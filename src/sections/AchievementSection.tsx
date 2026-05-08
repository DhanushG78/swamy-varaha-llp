"use client";

import { useEffect, useRef, useState } from "react";

type CounterProps = {
  end: number;
  label: string;
  suffix?: string;
};

const Counter = ({ end, label, suffix = "" }: CounterProps) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const increment = end / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, hasAnimated]);

  return (
    <div ref={ref} className="text-center py-8 md:py-0">
      <div className="text-3xl md:text-4xl font-medium text-white mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
};

const AchievementSection = ({ data }: { data: any }) => {
  const title = data?.section_title || "Achievements";
  const achievements = data?.achievements || [];

  if (!achievements.length) return null;

  return (
    <section style={{ backgroundColor: "#1e1e1e" }} className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        {title && (
          <h2 className="text-2xl font-medium text-white mb-10 text-center">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {achievements.map((achiev: any, i: number) => {
            const val = parseFloat(achiev.value || achiev.title || "0");
            const label = achiev.label || achiev.description || "Achievement";
            const suffix = achiev.suffix || "";

            return (
              <Counter
                key={achiev.uid || i}
                end={isNaN(val) ? 0 : val}
                label={label}
                suffix={suffix}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AchievementSection;
