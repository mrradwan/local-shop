"use client";

import React, { useEffect, useState, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Review } from "@/types/review.type";
import { StarRating } from "@/components/ui/star-rating";
import { getReviews } from "@/services/review.service";
import { ReviewSkeleton } from "@/components/reviews/review-skeleton";
export default function ReviewCarousel() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  useEffect(() => {
    const loadReviews = async () => {
      const data = await getReviews();
      setReviews(data.slice(0, 10));
      setLoading(false);
    };

    loadReviews();
  }, []);

  if (loading) {
    return (
      <div className="w-full">
        <ReviewSkeleton />
      </div>
    );
  }

  if (reviews.length === 0) return null;

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {reviews.map((item) => (
          <CarouselItem key={item._id}>
            <div className="flex flex-col gap-3">
              <div className="author flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold text-lg shrink-0 uppercase">
                  {item.user?.name?.charAt(0) || "U"}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 capitalize">
                    {item.user?.name || "Happy Customer"}
                  </h4>
                  <div className="mt-1">
                    <StarRating rating={item.rating || 5} />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic line-clamp-2">{item.review}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
