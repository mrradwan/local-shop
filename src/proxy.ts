import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request });
const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];
  const isAuthPage = authRoutes.includes(pathname);

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL(`/`, request.url));
  }
  
  const protectedRoutes = ["/cart", "/wishlist", "/checkout", "/profile", "/orders"];
  const isProtectedPage = protectedRoutes.some(route => pathname.startsWith(route));

  if (!token && isProtectedPage) {
    return NextResponse.redirect(new URL(`/login`, request.url));
  }
  
  return NextResponse.next();
}


export const config = {
  matcher: [
    // Auth Pages
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    
    // Protected Pages
    "/cart",
    "/wishlist",
    "/checkout",
    "/profile",
    "/orders/:path*",
  ],
};
