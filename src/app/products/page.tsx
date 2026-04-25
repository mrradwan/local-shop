import { Folder, Filter, X, Tag, PackageOpen } from "lucide-react";
import Link from "next/link";
import { getAllProducts } from "@/services/product.service";
import ProductCard from "@/components/shared/ProductCard";
import EmptyState from "@/components/shared/EmptyState";
import PageHeader from "@/components/shared/PageHeader";

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

/**
 * Dynamic helper to fetch metadata (title, image, breadcrumbs)
 * based on the active filter (category, subcategory, or brand).
 */
async function getPageDetails(
  category?: string,
  subcategory?: string,
  brand?: string,
) {
  // Define configurations for different filter scenarios
  const configs = [
    {
      id: brand,
      endpoint: `brands/${brand}`,
      parentName: "Brands",
      parentLink: "/brands",
      defaultTitle: "Brand Products",
      icon: <Tag size={28} className="text-white" />,
    },
    {
      id: subcategory,
      endpoint: `subcategories/${subcategory}`,
      parentName: "Categories",
      parentLink: "/categories",
      defaultTitle: "Category Products",
      icon: <Folder size={28} className="text-white" />,
    },
    {
      id: category,
      endpoint: `categories/${category}`,
      parentName: "Categories",
      parentLink: "/categories",
      defaultTitle: "Category Products",
      icon: <Folder size={28} className="text-white" />,
    },
  ];

  // Find the first active filter configuration
  const activeConfig = configs.find((config) => config.id);

  // Fetch specific details from API if a filter is active
  if (activeConfig) {
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/${activeConfig.endpoint}`,
      );
      const data = await res.json();

      return {
        title: data?.data?.name || activeConfig.defaultTitle,
        parentName: activeConfig.parentName,
        parentLink: activeConfig.parentLink,
        image: data?.data?.image || null,
        icon: activeConfig.icon,
      };
    } catch (error) {
      console.error("Error fetching page details:", error);
    }
  }

  // Fallback state for "All Products" view
  return {
    title: "All Products",
    parentName: "Products",
    parentLink: "/products",
    image: null,
    icon: <PackageOpen size={28} className="text-white" />,
  };
}

export default async function Products({ searchParams }: ProductsPageProps) {
  // Resolve search parameters for server-side usage
  const resolvedSearchParams = await searchParams;

  const category = resolvedSearchParams.category;
  const subcategory = resolvedSearchParams.subcategory;
  const brand = resolvedSearchParams.brand;

  // Execute both product fetching and metadata fetching concurrently
  const [products, pageDetails] = await Promise.all([
    getAllProducts({
      "category[in]": category,
      subcategory: subcategory,
      "brand[in]": brand,
    }),
    getPageDetails(category, subcategory, brand),
  ]);

  const hasFilters = !!(category || subcategory || brand);

  return (
    <div className="min-h-screen bg-white pb-10">
      {/* 1. Shared Page Header Component */}
      <PageHeader details={pageDetails} hasFilters={hasFilters} />

      <div className="container mx-auto px-4 py-8">
        {/* 2. Active Filters Display Section */}
        {hasFilters && (
          <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-6">
            <div className="flex items-center gap-2 text-gray-700 text-sm font-medium">
              <Filter size={16} />
              <span>Active Filters:</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Link href="/products">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-sm font-medium hover:bg-green-100 transition-colors border border-green-100">
                  {brand ? <Tag size={14} /> : <Folder size={14} />}
                  {pageDetails.title}
                  <X
                    size={14}
                    className="cursor-pointer hover:text-red-500 transition-colors"
                  />
                </span>
              </Link>

              <Link
                href="/products"
                className="text-sm text-gray-500 underline underline-offset-2 hover:text-gray-800 transition-colors ml-2"
              >
                Clear all
              </Link>
            </div>
          </div>
        )}

        {/* 3. Product Grid or Empty State Rendering */}
        {products.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="mb-6 text-sm text-gray-500 font-medium">
              Showing {products.length} products
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
