"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Gift,
  Headset,
  Heart,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Truck,
  User,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { TfiShoppingCart } from "react-icons/tfi";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Badge } from "../ui/badge";
import { signOut, useSession } from "next-auth/react";
import { FaArrowRightToBracket } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Spinner } from "../ui/spinner";
import { CartContext } from "@/provider/cart-provider";
import { WishlistContext } from "@/provider/wishlist-provider";

export default function Navbar() {
  // Session and Routing
  const { data: session, status } = useSession();
  const router = useRouter();

  // Local States
  const [navSearch, setNavSearch] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Contexts
  const { wishlistCount } = useContext(WishlistContext);
  const { numOfCartItems } = useContext(CartContext);

  // Handlers
  function handleLogOut() {
    setIsLoggingOut(true);
    signOut({ callbackUrl: "/login" });
  }

  const getInitials = (name?: string | null) => {
    return name ? name.slice(0, 2).toUpperCase() : "US";
  };

  const handleNavSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearch.trim()) {
      // Redirect to search page with query param
      router.push(`/search?keyword=${encodeURIComponent(navSearch)}`);
    }
  };

  return (
    <>
      {/* Top Bar (Hidden on Mobile) */}
      <div className="hidden lg:block text-sm border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-10">
            <div className="flex items-center gap-6 text-gray-500">
              <span className="flex items-center gap-2">
                <Truck className="text-green-600" size={12} />
                <span>Free Shipping on Orders 500 EGP</span>
              </span>
              <span className="flex items-center gap-2">
                <Gift className="text-green-600" size={12} />
                <span>New Arrivals Daily</span>
              </span>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-gray-500">
                <a
                  href="tel:+18001234567"
                  className="flex items-center gap-1.5 hover:text-green-600 transition-colors"
                >
                  <Phone size={12} />
                  <span>+1 (800) 123-4567</span>
                </a>
                <a
                  href="mailto:support@freshcart.com"
                  className="flex items-center gap-1.5 hover:text-green-600 transition-colors"
                >
                  <Mail size={12} />
                  <span>support@freshcart.com</span>
                </a>
              </div>
              <span className="w-px h-4 bg-gray-200"></span>

              {/* Handle Loading State to Prevent Flickering */}
              {status === "loading" ? (
                <div className="flex items-center gap-4">
                  <div className="w-24 h-4 bg-gray-200 animate-pulse rounded"></div>
                  <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
                </div>
              ) : session ? (
                <div className="flex items-center gap-4">
                  <Link
                    href="/profile"
                    className="flex items-center gap-1.5 text-gray-600 hover:text-green-600 transition-colors"
                  >
                    <User size={16} />
                    <span>{session?.user?.name || "John Doe"}</span>
                  </Link>

                  <Button
                    onClick={() => handleLogOut()}
                    disabled={isLoggingOut}
                    className="flex items-center gap-1.5 text-gray-600 hover:text-red-500 transition-colors bg-white disabled:opacity-50"
                  >
                    {isLoggingOut ? (
                      <span className="flex items-center gap-1.5">
                        <Spinner /> Signing Out...
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5">
                        <FaArrowRightToBracket /> Sign Out
                      </span>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Link href="/login">
                    <Button className="w-full flex items-center gap-1.5 text-gray-600 hover:text-green-600 transition-colors bg-white">
                      <User />
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="w-full flex items-center gap-1.5 text-gray-600 hover:text-green-600 transition-colors bg-white">
                      <UserPlus />
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16 lg:h-18 gap-4 lg:gap-8">
              {/* Logo */}
              <Link
                href="/"
                className="shrink-0 flex items-center gap-2 text-2xl font-bold"
              >
                <TfiShoppingCart className="text-green-600" />
                <h1 className="text-black">FreshCart</h1>
              </Link>

              {/* Desktop Search Bar */}
              <form
                className="hidden lg:flex flex-1 max-w-2xl"
                onSubmit={handleNavSearch}
              >
                <div className="relative w-full">
                  <Field>
                    <ButtonGroup>
                      <Input
                        className="text-lg focus-visible:border-green-600 focus-visible:ring-green-600 focus-visible:ring-1 focus-visible:outline-none"
                        id="input-button-group"
                        placeholder="Search for products, brands and more..."
                        value={navSearch}
                        onChange={(e) => setNavSearch(e.target.value)}
                      />
                      <Button
                        type="submit"
                        variant="outline"
                        className="hover:text-green-600 hover:bg-green-50 hover:border-green-600 cursor-pointer"
                      >
                        Search
                      </Button>
                    </ButtonGroup>
                  </Field>
                </div>
              </form>

              {/* Desktop Navigation Links */}
              <nav className="hidden xl:flex items-center gap-6">
                <NavigationMenu>
                  <NavigationMenuList className="flex items-center gap-3">
                    <NavigationMenuItem>
                      <NavigationMenuLink
                        className="text-gray-700 hover:text-green-600 font-medium transition-colors hover:bg-transparent text-lg"
                        render={<Link href="/">Home</Link>}
                      />
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink
                        className="text-gray-700 hover:text-green-600 font-medium transition-colors hover:bg-transparent text-lg"
                        render={<Link href="/products">Shop</Link>}
                      />
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="text-gray-700 hover:text-green-600 font-medium transition-colors hover:bg-transparent text-lg data-popup-open:bg-transparent data-popup-open:hover:bg-transparent">
                        Categories
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul>
                          <ListItem href="/categories" title="All Categories" />
                          <ListItem
                            href="/products?category=6439d2d167d9aa4ca970649f"
                            title="Electronics"
                          />
                          <ListItem
                            href="/products?category=6439d58a0049ad0b52b9003f"
                            title="Women's Fashion"
                          />
                          <ListItem
                            href="/products?category=6439d5b90049ad0b52b90048"
                            title="Men's Fashion"
                          />
                          <ListItem
                            href="/products?category=6439d40367d9aa4ca97064a8"
                            title="Beauty & Health"
                          />
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink
                        className="text-gray-700 hover:text-green-600 font-medium transition-colors hover:bg-transparent text-lg"
                        render={<Link href="/brands">Brands</Link>}
                      />
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </nav>

              {/* Right Side Actions */}
              <div className="flex items-center gap-4">
                <Link
                  href="/contact"
                  className="hidden lg:flex items-center gap-2 pr-3 mr-2 border-r border-gray-200 hover:opacity-80 transition-opacity"
                >
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                    <Headset className="text-green-600" />
                  </div>
                  <div className="text-xs">
                    <div className="text-gray-400">Support</div>
                    <div className="font-semibold text-gray-700">24/7 Help</div>
                  </div>
                </Link>

                {/* Badges / Skeleton Loader */}
                {status === "loading" ? (
                  <div className="hidden lg:flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full animate-pulse"></div>
                    <div className="w-10 h-10 bg-gray-100 rounded-full animate-pulse"></div>
                  </div>
                ) : (
                  session && (
                    <>
                      <Link
                        href="/wishlist"
                        className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group hidden lg:flex"
                      >
                        <Heart className="text-xl text-gray-600 group-hover:text-green-600 transition-colors" />
                        <Badge className="absolute top-0 -right-1 bg-green-600">
                          {wishlistCount}
                        </Badge>
                      </Link>
                      <Link
                        href="/cart"
                        className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group hidden lg:flex"
                      >
                        <ShoppingCart className="text-xl text-gray-600 group-hover:text-green-600 group-hover:fill-green-600 transition-colors fill-gray-500" />
                        <Badge className="absolute top-0 -right-1 bg-green-600">
                          {numOfCartItems}
                        </Badge>
                      </Link>
                    </>
                  )
                )}

                {/* Profile Dropdown / Login Button / Skeleton Loader */}
                {status === "loading" ? (
                  <div className="hidden lg:block w-12 h-12 bg-gray-100 rounded-full animate-pulse"></div>
                ) : session ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="h-12 w-12 items-center justify-center rounded-full hover:bg-gray-100 focus:outline-none transition-colors hidden lg:flex cursor-pointer">
                      <Avatar>
                        <AvatarFallback className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          {getInitials(session?.user?.name)}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-58" align="center">
                      <div className="flex items-center gap-3 py-2 px-1.5">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          {getInitials(session?.user?.name)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">
                            {session?.user?.name || "John Doe"}
                          </p>
                          <p className="text-xs text-gray-400 truncate">
                            {session?.user?.email || "john.doe@example.com"}
                          </p>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <Link
                          href="/profile/addresses"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors cursor-pointer "
                        >
                          <User size={16} />
                          <DropdownMenuItem className="cursor-pointer border-none outline-none">
                            Profile
                          </DropdownMenuItem>
                        </Link>
                        <Link
                          href="/orders"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors cursor-pointer"
                        >
                          <ShoppingBag size={16} />
                          <DropdownMenuItem className="cursor-pointer border-none outline-none">
                            Orders
                          </DropdownMenuItem>
                        </Link>
                        <Link
                          href="/wishlist"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors cursor-pointer"
                        >
                          <Heart size={16} />
                          <DropdownMenuItem className="cursor-pointer border-none outline-none">
                            Wishlist
                          </DropdownMenuItem>
                        </Link>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <Link
                          href="/profile/addresses"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors cursor-pointer"
                        >
                          <MapPin size={16} />
                          <DropdownMenuItem className="cursor-pointer border-none outline-none">
                            Addresses
                          </DropdownMenuItem>
                        </Link>
                        <Link
                          href="/profile/settings"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors cursor-pointer"
                        >
                          <Settings size={16} />
                          <DropdownMenuItem className="cursor-pointer border-none outline-none">
                            Settings
                          </DropdownMenuItem>
                        </Link>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onClick={() => handleLogOut()}
                          disabled={isLoggingOut}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left cursor-pointer data-disabled:opacity-50 data-disabled:cursor-not-allowed"
                        >
                          {isLoggingOut ? "Signing Out..." : "Sign out"}
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link href="/login">
                    <Button className="hidden lg:flex items-center gap-2 ml-2 px-5 py-2.5 rounded-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-colors shadow-sm shadow-green-600/20">
                      <User />
                      Sign In
                    </Button>
                  </Link>
                )}

                {/* Mobile Menu (Sheet) */}
                <Sheet>
                  <SheetTrigger
                    className="ml-1 w-10 h-10 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center transition-colors lg:hidden"
                    render={
                      <Button>
                        <Menu />
                      </Button>
                    }
                  />
                  <SheetContent className="overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle className="flex items-center gap-2 text-2xl font-bold p-4 border-b border-gray-100 rounded-2xl">
                        <TfiShoppingCart className="text-green-600" />
                        <p className="text-black">FreshCart</p>
                      </SheetTitle>

                      {/* Mobile Search Form */}
                      <Field className="p-4 border-b border-gray-200">
                        <form onSubmit={handleNavSearch}>
                          <ButtonGroup className="relative">
                            <Input
                              className="text-lg focus-visible:border-green-100 focus-visible:ring-green-100 focus-visible:ring-1 focus-visible:outline-none me-7"
                              id="input-button-group-mobile"
                              placeholder="Search products..."
                              value={navSearch}
                              onChange={(e) => setNavSearch(e.target.value)}
                            />
                            <Button
                              type="submit"
                              className="absolute -right-1 top-0 translate-y-0 w-8 h-8 bg-green-600 text-white flex items-center justify-center"
                            >
                              <Search />
                            </Button>
                          </ButtonGroup>
                        </form>
                      </Field>
                    </SheetHeader>

                    {/* Mobile Navigation Links */}
                    <nav className="p-4">
                      <div className="space-y-1">
                        <Link
                          href="/"
                          className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors text-lg"
                        >
                          Home
                        </Link>
                        <Link
                          href="/products"
                          className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors text-lg"
                        >
                          Shop
                        </Link>
                        <Link
                          href="/categories"
                          className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors text-lg"
                        >
                          Categories
                        </Link>
                        <Link
                          href="/brands"
                          className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors text-lg"
                        >
                          Brands
                        </Link>
                      </div>
                    </nav>

                    <div className="mx-1 border-t border-gray-200"></div>

                    {/* Mobile Authenticated Actions */}
                    {status === "loading" ? (
                      <div className="p-4 space-y-3">
                        <div className="w-full h-12 bg-gray-100 rounded-xl animate-pulse"></div>
                        <div className="w-full h-12 bg-gray-100 rounded-xl animate-pulse"></div>
                      </div>
                    ) : session ? (
                      <>
                        <div className="p-4 space-y-1">
                          <Link
                            href="/wishlist"
                            className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-green-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                                <Heart className="text-red-500" />
                              </div>
                              <span className="font-medium text-gray-700">
                                Wishlist
                              </span>
                            </div>
                            <Badge className="bg-green-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                              {wishlistCount}
                            </Badge>
                          </Link>
                          <Link
                            href="/cart"
                            className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-green-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center">
                                <ShoppingCart className="text-green-600" />
                              </div>
                              <span className="font-medium text-gray-700">
                                Cart
                              </span>
                            </div>
                            <Badge className="bg-green-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                              {numOfCartItems}
                            </Badge>
                          </Link>
                        </div>
                        <div className="mx-1 border-t border-gray-200"></div>
                      </>
                    ) : null}

                    {/* Mobile Footer */}
                    <SheetFooter className="mt-0">
                      {status === "loading" ? (
                        <div className="p-4 w-full">
                          <div className="w-full h-24 bg-gray-100 rounded-xl animate-pulse"></div>
                        </div>
                      ) : session ? (
                        <div className="p-4 space-y-1 w-full">
                          <Link
                            href="/profile"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-50 transition-colors"
                          >
                            <div className="flex items-center gap-3 py-2 px-1.5">
                              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                <User className="text-green-600" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-gray-800 truncate">
                                  {session?.user?.name || "John Doe"}
                                </p>
                              </div>
                            </div>
                          </Link>

                          <button
                            onClick={() => handleLogOut()}
                            disabled={isLoggingOut}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors w-full text-left bg-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isLoggingOut ? (
                              <div className="flex items-center justify-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                                  <Spinner className="text-red-500" />
                                </div>
                                <span className="font-medium text-red-600">
                                  Signing Out...
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-center justify-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                                  <LogOut className="text-red-500" />
                                </div>
                                <span className="font-medium text-red-600">
                                  Sign Out
                                </span>
                              </div>
                            )}
                          </button>
                        </div>
                      ) : (
                        <div className="p-4 space-y-1 w-full">
                          <div className="grid grid-cols-2 gap-3 pt-2">
                            <Link href="/login">
                              <Button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors">
                                <User size={16} />
                                Sign In
                              </Button>
                            </Link>
                            <Link href="/register">
                              <Button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 bg-white border-green-600 text-green-600 font-semibold hover:bg-green-50 transition-colors">
                                <UserPlus size={16} />
                                Sign Up
                              </Button>
                            </Link>
                          </div>
                        </div>
                      )}

                      <Link
                        href="/contact"
                        className="mx-4 mt-2 p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-3 hover:bg-green-50 transition-colors w-[calc(100%-2rem)]"
                      >
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                          <Headset className="text-green-600" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-700">
                            Need Help?
                          </div>
                          <div className="text-sm text-green-600">
                            Contact Support
                          </div>
                        </div>
                      </Link>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

// Sub-component for navigation list items
function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink
        className="p-0 m-0"
        render={
          <Link href={href} className="hover:bg-transparent">
            <div className="flex flex-col gap-1 text-sm w-full">
              <div className="block px-4 py-2.5 text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors rounded-[7px]">
                {title}
              </div>
              <div className="line-clamp-2 text-muted-foreground">
                {children}
              </div>
            </div>
          </Link>
        }
      />
    </li>
  );
}
