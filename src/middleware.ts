import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";

export async function middleware(request: NextRequest) {
  let user;

  try {
    user = await getUserMeLoader();
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.next();
  }

  const fullPath = request.nextUrl.pathname + request.nextUrl.search;
  const response = NextResponse.next();

  if (!user.ok) {
    if (fullPath.startsWith("/dashboard")) {
      const coursesUrl = new URL("/courses", request.url);
      const redirectResponse = NextResponse.redirect(coursesUrl);

      redirectResponse.cookies.set("redirect-link", fullPath, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 5, // 5 minutes
        path: "/",
      });

      return redirectResponse;
    }
  } else {
    const redirectLinkCookie = request.cookies.get("redirect-link");
    if (redirectLinkCookie) {
      const redirectUrl = new URL(redirectLinkCookie.value, request.url);
      const redirectResponse = NextResponse.redirect(redirectUrl);
      redirectResponse.cookies.delete("redirect-link");
      return redirectResponse;
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}