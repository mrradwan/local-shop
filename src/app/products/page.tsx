import { Folder, Filter, X, Tag, PackageOpen } from "lucide-react";
import Link from "next/link";
import { getAllProducts } from "@/services/product.service";
import ProductCard from "@/components/shared/ProductCard";
import EmptyState from "@/components/shared/EmptyState";
import PageHeader from "@/components/shared/PageHeader";

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

// 🌟 الدالة كاملة أهي بتجيب الداتا والصور والاسم
async function getPageDetails(category?: string, subcategory?: string, brand?: string) {
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
    }
  ];

  // 2. بندور على أول حالة شغالة (يعني الـ id بتاعها مش undefined)
  const activeConfig = configs.find(config => config.id);

  // 3. لو لقينا حالة، هنعمل الـ fetch مرة واحدة بس!
  if (activeConfig) {
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/${activeConfig.endpoint}`);
      const data = await res.json();
      
      return {
        title: data?.data?.name || activeConfig.defaultTitle,
        parentName: activeConfig.parentName,
        parentLink: activeConfig.parentLink,
        image: data?.data?.image || null,
        icon: activeConfig.icon,
      };
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  }

  // 4. الحالة الافتراضية (لو مفيش أي فلاتر أو حصل إيرور)
  return {
    title: "All Products",
    parentName: "Products",
    parentLink: "/products",
    image: null,
    icon: <PackageOpen size={28} className="text-white" />,
  };
}


export default async function Products({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = await searchParams;

  const category = resolvedSearchParams.category;
  const subcategory = resolvedSearchParams.subcategory;
  const brand = resolvedSearchParams.brand;

  const [products, pageDetails] = await Promise.all([
    getAllProducts({ category, subcategory, brand }),
    getPageDetails(category, subcategory, brand)
  ]);

  const hasFilters = !!(category || subcategory || brand);

  return (
    <div className="min-h-screen bg-white pb-10">
      
      {/* 🌟 1. الهيدر المشترك (بنديله الداتا وهو بيرسم نفسه) */}
      <PageHeader details={pageDetails} hasFilters={hasFilters} />

      <div className="container mx-auto px-4 py-8">
        
        {/* 🌟 2. الفلاتر النشطة */}
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
                  <X size={14} className="cursor-pointer hover:text-red-500 transition-colors" />
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

        {/* 🌟 3. عرض المنتجات أو الشاشة الفاضية */}
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