import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // NextAuth maneja la autenticación automáticamente
  // Este middleware solo es para redirecciones adicionales si se necesitan
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
