import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/shared/(.*)",       // Public shared reports
  "/api/webhooks/(.*)", // Clerk + Stripe webhooks
  "/datasets(.*)",      // Allow viewing datasets in demo
]);

export default function middleware(req: any, event: any) {
  // If Clerk keys are missing, bypass Clerk entirely to prevent 500 error
  if (!process.env.CLERK_SECRET_KEY || !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    console.warn("⚠️ Clerk keys missing. Bypassing authentication middleware.");
    return NextResponse.next();
  }

  // Otherwise, run the standard Clerk middleware
  return clerkMiddleware(async (auth, req) => {
    if (!isPublicRoute(req)) await auth.protect();
  })(req, event);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
