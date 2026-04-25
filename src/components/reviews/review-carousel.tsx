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

/**
 * ReviewCarousel Component
 * Displays a dynamic list of customer reviews in an auto-playing slider.
 */
export default function ReviewCarousel() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize Autoplay plugin with a 3-second interval
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  /**
   * Fetch reviews on component mount and limit display to the top 10
   */
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await getReviews();
        setReviews(data.slice(0, 10));
      } catch (error) {
        console.error("Failed to load reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  // View: Loading State with Skeleton placeholder
  if (loading) {
    return (
      <div className="w-full">
        <ReviewSkeleton />
      </div>
    );
  }

  // Early return if no reviews are available
  if (reviews.length === 0) return null;

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      // Pause animation when user hovers over the carousel
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {reviews.map((item) => (
          <CarouselItem key={item._id}>
            <div className="flex flex-col gap-3">
              {/* Reviewer Meta Information */}
              <div className="author flex items-center gap-4">
                {/* Dynamic Avatar: Displays the first letter of the user's name */}
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
              {/* Review Text Body */}
              <p className="text-gray-600 italic line-clamp-2">
                &quot;{item.review}&quot;
              </p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
