"use client";

import React, { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

interface ProductCarouselProps {
  images: string[];
}

export default function ProductCarousel({ images }: ProductCarouselProps) {
  // Initialize Autoplay plugin with 3s delay and interaction handling
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  // Guard clause for empty image array
  if (!images || images.length === 0) return null;

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs mx-auto"
      // Pause autoplay on hover and reset when leaving
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {images.map((imgSrc, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="border-gray-100 shadow-sm overflow-hidden">
                <CardContent className="flex aspect-square items-center justify-center p-0">
                  <Image
                    src={imgSrc}
                    alt={`Product Image ${index + 1}`}
                    width={400}
                    height={400}
                    className="object-contain w-full h-full hover:scale-105 transition-transform duration-300"
                    // Optimization: Set priority for the first image to reduce LCP
                    priority={index === 0}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
