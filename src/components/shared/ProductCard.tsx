import { Product } from "@/types/product.type";
import { Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import AddToCartBtn from "../cart/AddToCartBtn";
import AddToWishlistBtn from "../wishlist/AddToWishlistBtn";

// بنستقبل بيانات منتج واحد بس
export default function ProductCard({ product, index = 0 }: { product: Product, index?: number }) {
  const hasDiscount = !!product.priceAfterDiscount;
  const discountPercentage = hasDiscount
    ? Math.round(((product.price - product.priceAfterDiscount!) / product.price) * 100)
    : 0;

  return (
    <Card className="bg-white border border-gray-200 rounded-lg group duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between overflow-hidden">
      <div>
        <CardHeader className="relative overflow-hidden p-0">
          <Link href={`/products/${product.id}`}>
            <Image
              src={product.imageCover}
              alt={product.slug}
              width={250}
              height={250}
              className="group-hover:scale-110 duration-300 ease-in-out object-contain w-full h-48 p-4"
              priority={index < 5}
            />
          </Link>
          {hasDiscount && (
            <div className="absolute top-3 left-3 z-10">
              <Badge className="bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 font-bold">
                -{discountPercentage}%
              </Badge>
            </div>
          )}

          <CardAction className="absolute top-3 right-3 flex flex-col space-y-2 z-10">
            <AddToWishlistBtn prodId={product.id} />
            <Link href={`/products/${product.id}`}>
              <div className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-green-600 shadow-md cursor-pointer transition-colors">
                <Eye size={18} />
              </div>
            </Link>
          </CardAction>
        </CardHeader>

        <CardContent className="p-4 pb-2">
          <p className="text-xs text-gray-500 mb-1 line-clamp-1 font-medium">
            {product.category?.name || "General"}
          </p>
          <Link href={`/products/${product.id}`}>
            <CardTitle className="font-semibold text-sm sm:text-base mb-1 cursor-pointer line-clamp-1 hover:text-green-600 transition-colors">
              {product.title}
            </CardTitle>
            <CardDescription className="py-1 line-clamp-2 text-xs text-gray-500">
              {product.description}
            </CardDescription>
          </Link>

          <div className="flex items-center mt-2 mb-1">
            <div className="flex text-amber-400 mr-2">
              <StarRating rating={product.ratingsAverage} />
            </div>
            <span className="text-xs text-gray-500 font-medium">
              {product.ratingsAverage} ({product.ratingsQuantity})
            </span>
          </div>

          {product.availableColors && product.availableColors.length > 0 && (
            <div className="flex items-center gap-1.5 mt-3">
              {product.availableColors.map((color, idx) => (
                <div
                  key={idx}
                  className="w-3.5 h-3.5 rounded-full border border-gray-300 shadow-sm"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          )}
        </CardContent>
      </div>

      <CardFooter className="flex items-center justify-between p-4 pt-2 bg-white mt-auto">
        <div className="flex flex-col">
          {hasDiscount ? (
            <>
              <span className="text-base sm:text-lg font-bold text-green-600">
                {product.priceAfterDiscount} EGP
              </span>
              <span className="text-xs text-gray-400 line-through">
                {product.price} EGP
              </span>
            </>
          ) : (
            <span className="text-base sm:text-lg font-bold text-gray-800">
              {product.price} EGP
            </span>
          )}
        </div>
        <AddToCartBtn prodId={product.id} />
      </CardFooter>
    </Card>
  );
}