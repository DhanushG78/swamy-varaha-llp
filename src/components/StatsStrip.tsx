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
          // Animate count
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

type StatsStripProps = {
  stats?: {
    value: number;
    label: string;
    suffix?: string;
  }[];
};

const StatsStrip = ({ stats }: StatsStripProps) => {
  const defaultStats: { value: number; label: string; suffix?: string }[] = [
    { value: 3298, label: "# of Buy Properties" },
    { value: 2181, label: "# of Sell Properties" },
    { value: 9316, label: "# of All Properties" },
    { value: 7191, label: "# of Agents" },
  ];

  const data = stats || defaultStats;

  return (
    <section style={{ backgroundColor: "#1e1e1e" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {data.map((stat, i) => (
            <Counter
              key={i}
              end={stat.value}
              label={stat.label}
              suffix={stat.suffix}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsStrip;
