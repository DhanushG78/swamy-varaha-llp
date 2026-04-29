"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

type Slide = {
  uid: string;
  content: React.ReactNode;
};

type Props = {
  slides: Slide[];
};

const PropertyCarousel = ({ slides }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  if (!slides || slides.length === 0) return null;

  return (
    <div className="relative">
      {/* Carousel */}
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide) => (
            <div key={slide.uid} className="embla__slide px-3">
              {slide.content}
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next Controls */}
      {slides.length > 3 && (
        <div className="flex items-center gap-3 mt-8 justify-center">
          <button
            onClick={scrollPrev}
            disabled={!canPrev}
            className="w-10 h-10 flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-charcoal hover:text-white hover:border-charcoal disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            aria-label="Previous"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={scrollNext}
            disabled={!canNext}
            className="w-10 h-10 flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-charcoal hover:text-white hover:border-charcoal disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            aria-label="Next"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyCarousel;
