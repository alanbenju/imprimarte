"use client";

import React, { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductCarouselProps {
  images: string[];
  productName: string;
}

export function ProductCarousel({ images, productName }: ProductCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((src, index) => (
            <div className="relative min-w-full" key={index}>
              <div className="relative h-64 w-full">
                <Image
                  src={src}
                  alt={`${productName} - Variante ${index + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <button
        className={`absolute left-2 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md transition-all hover:bg-white ${
          !prevBtnEnabled ? "cursor-default opacity-50" : ""
        }`}
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
        aria-label="Previous image"
      >
        <ChevronLeft className="size-6 text-blue-800" />
      </button>
      
      <button
        className={`absolute right-2 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md transition-all hover:bg-white ${
          !nextBtnEnabled ? "cursor-default opacity-50" : ""
        }`}
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
        aria-label="Next image"
      >
        <ChevronRight className="size-6 text-blue-800" />
      </button>
    </div>
  );
} 