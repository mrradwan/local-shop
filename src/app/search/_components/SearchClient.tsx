"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home } from "lucide-react";
import {
  FaChevronLeft,
  FaGripVertical,
  FaListUl,
  FaMagnifyingGlass,
} from "react-icons/fa6";
import { FaSlidersH } from "react-icons/fa";
import {
  useQueryState,
  parseAsString,
  parseAsArrayOf,
  parseAsInteger,
} from "nuqs";
import { useDebouncedCallback } from "use-debounce";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import ProductCard from "@/components/shared/ProductCard";
import EmptyState from "@/components/shared/EmptyState";
import { Product } from "@/types/product.type";

interface SearchClientProps {
  products: Product[];
  categoriesList: { _id: string; name: string }[];
  brandsList: { _id: string; name: string }[];
}

// Sorting options configuration
const sortItems = [
  { label: "Relevance", value: "relevance" },
  { label: "Price: Low to High", value: "price" },
  { label: "Price: High to Low", value: "-price" },
  { label: "Rating: High to Low", value: "-ratingsAverage" },
  { label: "Name: A to Z", value: "title" },
  { label: "Name: Z to A", value: "-title" },
];

export default function SearchClient({
  products,
  categoriesList,
  brandsList,
}: SearchClientProps) {
  // Local state for UI layout toggle
  const [viewState, setViewState] = useState<"grid" | "list">("grid");

  /**
   * Sync URL Query Parameters with Component State using NUQS
   * shallow: false ensures the server component re-renders on state change
   */
  const [keyword, setKeyword] = useQueryState("keyword", {
    ...parseAsString.withDefault(""),
    shallow: false,
  });
  const [categories, setCategories] = useQueryState("category", {
    ...parseAsArrayOf(parseAsString).withDefault([]),
    shallow: false,
  });
  const [brands, setBrands] = useQueryState("brand", {
    ...parseAsArrayOf(parseAsString).withDefault([]),
    shallow: false,
  });
  const [minPrice, setMinPrice] = useQueryState("minPrice", {
    ...parseAsInteger,
    shallow: false,
  });
  const [maxPrice, setMaxPrice] = useQueryState("maxPrice", {
    ...parseAsInteger,
    shallow: false,
  });
  const [sort, setSort] = useQueryState("sort", {
    ...parseAsString.withDefault(""),
    shallow: false,
  });
  const [page, setPage] = useQueryState("page", {
    ...parseAsInteger.withDefault(1),
    shallow: false,
  });

  // Local input state for immediate feedback before debouncing
  const [localKeyword, setLocalKeyword] = useState(keyword || "");

  /**
   * Optimized Handlers with Debouncing
   * Prevents excessive API calls while typing
   */
  const handleSearch = useDebouncedCallback((value: string) => {
    setKeyword(value || null);
    setPage(1);
  }, 500);

  const handleMinPrice = useDebouncedCallback((value: string) => {
    const num = parseInt(value);
    setMinPrice(num > 0 ? num : null);
    setPage(1);
  }, 500);

  const handleMaxPrice = useDebouncedCallback((value: string) => {
    const num = parseInt(value);
    setMaxPrice(num > 0 ? num : null);
    setPage(1);
  }, 500);

  const applyQuickPrice = (max: number) => {
    setMinPrice(null);
    setMaxPrice(max);
    setPage(1);
  };

  /**
   * Toggles array-based filters (Categories/Brands)
   */
  const toggleFilter = (id: string, type: "category" | "brand") => {
    const currentState = type === "category" ? categories : brands;
    const setState = type === "category" ? setCategories : setBrands;

    if (currentState.includes(id)) {
      setState(currentState.filter((item) => item !== id) || null);
    } else {
      setState([...currentState, id]);
    }
    setPage(1);
  };

  const paginationPages = [1, 2, 3, 4, 5];

  // Reusable Filter UI for Desktop Sidebar and Mobile Sheet
  const filtersContent = (
    <div className="space-y-6">
      {/* Categories Filter Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">Categories</h3>
        </div>
        <div className="space-y-2 max-h-52 overflow-y-auto custom-scrollbar">
          {categoriesList.map((cat) => (
            <div
              key={cat._id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <Checkbox
                id={cat._id}
                checked={categories.includes(cat._id)}
                onCheckedChange={() => toggleFilter(cat._id, "category")}
                className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <Label
                htmlFor={cat._id}
                className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors cursor-pointer"
              >
                {cat.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Price Range Section */}
      <div className="mt-6">
        <h3 className="font-bold text-gray-900 mb-4">Price Range</h3>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">
              Min (EGP)
            </label>
            <input
              type="number"
              value={minPrice ?? ""}
              onChange={(e) => handleMinPrice(e.target.value)}
              placeholder="0"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-green-500 outline-none"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">
              Max (EGP)
            </label>
            <input
              type="number"
              value={maxPrice ?? ""}
              onChange={(e) => handleMaxPrice(e.target.value)}
              placeholder="No limit"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-green-500 outline-none"
            />
          </div>
        </div>
        {/* Quick Price Shortcuts */}
        <div className="flex flex-wrap gap-2">
          {[500, 1000, 5000, 10000].map((price) => (
            <Button
              key={price}
              onClick={() => applyQuickPrice(price)}
              type="button"
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                maxPrice === price
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Under {price >= 1000 ? `${price / 1000}K` : price}
            </Button>
          ))}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Brands Filter Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">Brands</h3>
        </div>
        <div className="space-y-2 max-h-52 overflow-y-auto custom-scrollbar">
          {brandsList.map((brand) => (
            <div
              key={brand._id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <Checkbox
                id={brand._id}
                checked={brands.includes(brand._id)}
                onCheckedChange={() => toggleFilter(brand._id, "brand")}
                className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <Label
                htmlFor={brand._id}
                className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors cursor-pointer"
              >
                {brand.name}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Search Header and Navigation */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <Link
                    href="/"
                    className="hover:text-green-600 transition-colors flex items-center gap-1.5"
                  >
                    <Home size={16} /> <span>Home</span>
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>Search Results</BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </nav>

          {/* Search Input Bar */}
          <form
            className="max-w-2xl"
            onSubmit={(e) => {
              e.preventDefault();
              setKeyword(localKeyword || null);
              setPage(1);
            }}
          >
            <div className="relative">
              <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                value={localKeyword || ""}
                onChange={(e) => {
                  setLocalKeyword(e.target.value);
                  handleSearch(e.target.value);
                }}
                placeholder="Search for products..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-green-500/20 text-lg bg-white"
              />
            </div>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
              {filtersContent}
            </div>
          </aside>

          {/* Main Results Area */}
          <main className="flex-1 min-w-0">
            {/* Toolbar: Mobile Filters, View Toggle, and Sorting */}
            <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
              <div className="flex items-center gap-4">
                {/* Mobile Filter Sheet */}
                <Sheet>
                  <SheetTrigger className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer outline-none">
                    <FaSlidersH /> Filters
                  </SheetTrigger>
                  <SheetContent
                    side="left"
                    className="w-75 sm:w-100 overflow-y-auto bg-white"
                  >
                    <SheetHeader className="mb-6 text-left">
                      <SheetTitle className="text-xl font-bold">
                        Filters
                      </SheetTitle>
                    </SheetHeader>
                    {filtersContent}
                  </SheetContent>
                </Sheet>

                {/* View State Toggle (Grid/List) */}
                <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-1">
                  <button
                    onClick={() => setViewState("grid")}
                    className={`p-2 rounded-md transition-colors cursor-pointer ${viewState === "grid" ? "bg-green-600 text-white" : "text-gray-500 hover:bg-gray-100"}`}
                  >
                    <FaGripVertical />
                  </button>
                  <button
                    onClick={() => setViewState("list")}
                    className={`p-2 rounded-md transition-colors cursor-pointer ${viewState === "list" ? "bg-green-600 text-white" : "text-gray-500 hover:bg-gray-100"}`}
                  >
                    <FaListUl />
                  </button>
                </div>
              </div>

              {/* Sorting Select Component */}
              <div className="flex items-center gap-2 w-auto min-w-40">
                <span className="text-sm text-gray-500 whitespace-nowrap">
                  Sort by:
                </span>
                <Select
                  value={sort || "relevance"}
                  onValueChange={(val) => {
                    setSort(val === "relevance" ? null : val);
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="w-full min-w-40 bg-white">
                    <SelectValue>
                      {
                        sortItems.find((i) => i.value === (sort || "relevance"))
                          ?.label
                      }
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {sortItems.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Listing or Empty State */}
            {products.length === 0 ? (
              <EmptyState />
            ) : (
              <div
                className={
                  viewState === "grid"
                    ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
                    : "flex flex-col space-y-4"
                }
              >
                {products.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))}
              </div>
            )}

            {/* Static Pagination Controls */}
            {products.length > 0 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <FaChevronLeft />
                </button>

                {paginationPages.map((num) => (
                  <button
                    key={num}
                    onClick={() => setPage(num)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium transition-colors ${page === num ? "bg-green-600 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                  >
                    {num}
                  </button>
                ))}

                <button
                  onClick={() => setPage((p) => p + 1)}
                  className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <FaChevronLeft className="rotate-180" />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
