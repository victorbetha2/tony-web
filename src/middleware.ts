import { auth } from "@/auth";

export default auth((req) => {
  const pathname = req.nextUrl.pathname;
  const isLoginPage = pathname === "/admin/login";
  const isAuthenticated = !!req.auth;

  if (pathname.startsWith("/admin") && !isLoginPage && !isAuthenticated) {
    return Response.redirect(new URL("/admin/login", req.url));
  }

  if (isLoginPage && isAuthenticated) {
    return Response.redirect(new URL("/admin", req.url));
  }
});

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
