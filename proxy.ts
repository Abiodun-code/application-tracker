import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export default async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  const isSignInPage = request.nextUrl.pathname.startsWith("/sign-in");
  const isSignUpPage = request.nextUrl.pathname.startsWith("/sign-up");

  if ((isSignInPage || isSignUpPage) && sessionCookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Uncomment when ready to enforce dashboard protection:
  // const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard");
  // if (isDashboardPage && !sessionCookie) {
  //   return NextResponse.redirect(new URL("/sign-in", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/sign-in", "/sign-up"],
};