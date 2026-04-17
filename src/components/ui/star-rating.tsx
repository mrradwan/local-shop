import { Star, StarHalf } from "lucide-react";
import React from "react";

interface StarRatingProps {
  rating: number; 
}

export function StarRating({ rating }: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((index) => {
        if (rating >= index) {
          return <Star key={index} size={14} className="fill-amber-400 text-amber-400" />;
        }
        
        if (rating >= index - 0.5) {
          return (
            <div key={index} className="relative">
              <Star size={14} className="fill-gray-200 text-gray-200" />
              <StarHalf size={14} className="absolute top-0 left-0 fill-amber-400 text-amber-400" />
            </div>
          );
        }
        
        return <Star key={index} size={14} className="fill-gray-200 text-gray-200" />;
      })}
    </div>
  );
}