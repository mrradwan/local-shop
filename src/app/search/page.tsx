import { getAllProducts } from "@/services/product.service";
import SearchClient from "./_components/SearchClient";

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

/**
 * Search Page - Server Component
 * Handles server-side data fetching for products, categories, and brands
 */
export default async function SearchPage({ searchParams }: SearchPageProps) {
  // Resolve dynamic search parameters from the URL
  const resolvedParams = await searchParams;

  // Prepare API parameters with the correct syntax for the RouteMisr API filters
  const apiParams = {
    keyword: resolvedParams.keyword,
    "category[in]": resolvedParams.category,
    "brand[in]": resolvedParams.brand,
    "price[gte]": resolvedParams.minPrice,
    "price[lte]": resolvedParams.maxPrice,
    sort: resolvedParams.sort,
    page: resolvedParams.page || "1",
    limit: "12",
  };

  /**
   * Parallel Data Fetching:
   * Executes multiple requests simultaneously to minimize total loading time (TTFB).
   */
  const [products, categoriesRes, brandsRes] = await Promise.all([
    getAllProducts(apiParams),
    fetch("https://ecommerce.routemisr.com/api/v1/categories").then((res) =>
      res.json(),
    ),
    fetch("https://ecommerce.routemisr.com/api/v1/brands").then((res) =>
      res.json(),
    ),
  ]);

  return (
    /* Pass the fetched data to the Client Component for interactive UI rendering */
    <SearchClient
      products={products}
      categoriesList={categoriesRes.data || []}
      brandsList={brandsRes.data || []}
    />
  );
}
