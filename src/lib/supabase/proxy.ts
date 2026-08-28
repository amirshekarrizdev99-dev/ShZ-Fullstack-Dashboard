import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = [
  "/",
  "/users",
  "/upload",
  "/products",
  "/profile",
  "/orders",
  "/calendar",
  "/sales",
];

const authRoutes = ["/signin", "/signup"];

function isProtectedRoute(pathname: string) {
  return protectedRoutes.some((route) => {
    if (route === "/") {
      return pathname === "/";
    }

    return pathname === route || pathname.startsWith(`${route}/`);
  });
}

function isAuthRoute(pathname: string) {
  return authRoutes.includes(pathname);
}

export async function updateSession(request: NextRequest) {
  const supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);

            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const { data } = await supabase.auth.getClaims();

  const pathname = request.nextUrl.pathname;

  const isAuthenticated = Boolean(data?.claims);

  /*
   * User is NOT authenticated
   * → Protected route → /signin
   */
  if (!isAuthenticated && isProtectedRoute(pathname)) {
    const url = request.nextUrl.clone();

    url.pathname = "/signin";

    return NextResponse.redirect(url);
  }

  /*
   * User IS authenticated
   * → /signin or /signup → /
   */
  if (isAuthenticated && isAuthRoute(pathname)) {
    const url = request.nextUrl.clone();

    url.pathname = "/";

    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
