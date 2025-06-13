import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const {pathname} = req.nextUrl;
        if(pathname.startsWith("/api/auth") || pathname === "/login" || pathname === "/register") return true

        if(pathname.startsWith("/api/videos") || pathname === "/"){
            return true;
        }

        return !!token 
      },
    },
  }
);

export const config = {
  matcher: [
    // Match everything except static files and public assets
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}

