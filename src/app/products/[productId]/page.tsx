import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CheckCircle2, Home, RotateCcw, Van, XCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import ProductCarousel from "@/app/products/[productId]/_components/product-carousel";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import QuantitySelector from "@/app/products/[productId]/_components/quantity-selector";
import { FaShieldAlt } from "react-icons/fa";
import { getProductById } from "@/services/product.service";
import AddToCartBtn from "@/components/cart/AddToCartBtn";
import AddToWishlistBtn from "@/components/wishlist/AddToWishlistBtn";
export default async function ProductDetails({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = await getProductById(productId);
  if (!product) {
    return <div className="p-10 text-center text-2xl">Product not found!</div>;
  }

  return (
    <>
      <Breadcrumb className="py-4 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <BreadcrumbList className="flex items-center flex-wrap sm:gap-2 text-sm text-gray-500">
            <BreadcrumbItem>
              <Link
                href="/"
                className="flex items-center gap-1.5 hover:text-green-600 transition-colors"
              >
                <Home size={16} />
                <span>Home</span>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link
                href="/products"
                className="hover:text-green-600 transition-colors"
              >
                All Products
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link
                href={`/products?category=${product.category?._id}`}
                className="hover:text-green-600 transition-colors"
              >
                {product.category?.name}
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {product.subcategory && product.subcategory.length > 0 && (
              <>
                <BreadcrumbItem>
                  <Link
                    href={`/products?subcategory=${product.subcategory[0]._id}`}
                    className="hover:text-green-600 transition-colors"
                  >
                    {product.subcategory[0].name}
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-900 font-medium line-clamp-1">
                {product.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </div>
      </Breadcrumb>
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
              <ProductCarousel images={product.images} />
            </div>
            <div className="lg:w-3/4">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Link href={`/products?category=${product.category?._id}`}>
                    <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                      {product.category?.name}
                    </Badge>
                  </Link>
                  <div>
                    <Badge className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full">
                      {product.brand.name}
                    </Badge>
                  </div>
                </div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                  {product.title}
                </h1>
                <div className="flex items-center mt-2 mb-1">
                  <div className="flex text-amber-400 mr-2">
                    <StarRating rating={product.ratingsAverage} />
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.ratingsAverage} ({product.ratingsQuantity} reviews)
                  </span>
                </div>
                <div className="flex items-center flex-wrap gap-3 mb-6">
                  <span className="text-3xl font-bold text-gray-900">
                    {product.price.toFixed(2)} EGP{" "}
                  </span>
                </div>
                <div className="mb-4">
                  {product.quantity > 0 ? (
                    <div className="flex items-center gap-1.5 text-green-700 bg-green-50 border border-green-200 w-fit px-3 py-1 rounded-full text-sm font-medium">
                      <CheckCircle2 size={16} />
                      <span>In Stock</span>
                      <span className="text-green-600/70 text-xs ml-1">
                        ({product.quantity} available)
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-red-700 bg-red-50 border border-red-200 w-fit px-3 py-1 rounded-full text-sm font-medium">
                      <XCircle size={16} />
                      <span>Out of Stock</span>
                    </div>
                  )}
                </div>
                <div className="border-t border-gray-100 pt-5 mb-6">
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
                <QuantitySelector
                  stockQuantity={product.quantity}
                  price={product.price}
                  priceAfterDiscount={product.priceAfterDiscount}
                />
                {/******************************* actions can be added here*******************************/}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <AddToCartBtn prodId={product.id} variant="text" />
                  <AddToWishlistBtn prodId={product.id} variant="text"/>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                        <Van size={18} className="text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">
                          Free Delivery
                        </h4>
                        <p className="text-gray-500 text-xs">Orders over $50</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                        <RotateCcw size={18} className="text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">
                          30 Days Return
                        </h4>
                        <p className="text-gray-500 text-xs">Money back</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                        <FaShieldAlt size={18} className="text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">
                          Secure Payment
                        </h4>
                        <p className="text-gray-500 text-xs">100% Protected</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
