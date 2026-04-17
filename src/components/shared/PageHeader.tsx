import Link from "next/link";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { Home, Layers } from "lucide-react";

// 🌟 بنعرف التايبس بتاعة الداتا اللي الكومبوننت هيستقبلها
interface PageDetails {
  title: string;
  parentName: string;
  parentLink: string;
  image?: string | null;
  icon: React.ReactNode;
  description?: string;
}

interface PageHeaderProps {
  details: PageDetails;
  hasFilters: boolean;
}

export default function PageHeader({ details, hasFilters }: PageHeaderProps) {
  return (
    <div className="bg-linear-to-br from-green-600 via-green-500 to-green-400 text-white">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <nav className="mb-6">
          <Breadcrumb>
            <BreadcrumbList className="text-white/80 text-sm">
              <BreadcrumbItem>
                <Link
                  href="/"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Home size={16} />
                  <span>Home</span>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/60" />

              {/* لو في فلتر (قسم أو ماركة) بنعرض اللينك بتاع الأب */}
              {hasFilters && (
                <>
                  <BreadcrumbItem>
                    <Link
                      href={details.parentLink}
                      className="hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <Layers size={16} />
                      <span>{details.parentName}</span>
                    </Link>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-white/60" />
                </>
              )}

              <BreadcrumbItem>
                <span className="text-white font-medium">{details.title}</span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </nav>

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30 overflow-hidden relative">
            {/* 🌟 هنا بنعرض الصورة لو موجودة، أو الأيقونة لو مفيش صورة */}
            {details.image ? (
              <Image
                src={details.image}
                alt={details.title}
                fill
                sizes="64px"
                className="object-contain p-1.5"
              />
            ) : (
              details.icon
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {details.title}
            </h1>
            <p className="text-white/90 mt-1 text-sm">
              {details.description ? details.description : `Browse our latest ${details.title.toLowerCase()} products`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
