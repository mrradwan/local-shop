import { Brand } from "./brand.type";
import { Category } from "./category.type";
import { SubCategory } from "./subcategory.type";

export interface Product {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  sold: number;
  price: number;
  priceAfterDiscount?: number;
  availableColors?: string[];
  imageCover: string;
  images: string[];
  category: Category;
  subcategory: SubCategory[];
  brand: Brand;
  ratingsAverage: number;
  ratingsQuantity: number;
  createdAt: string;
  updatedAt: string;
}
