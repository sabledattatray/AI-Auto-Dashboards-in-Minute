import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/shared/(.*)",       // Public shared reports
  "/api/webhooks/(.*)", // Clerk + Stripe webhooks
  "/datasets(.*)",      // Allow viewing datasets in demo
]);

export default clerkMiddleware(async (auth, req) => {
  // Fail-safe check for environment variables
  if (!process.env.CLERK_SECRET_KEY || !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    console.error("❌ CLERK KEYS MISSING: Please add CLERK_SECRET_KEY and NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY to Vercel Environment Variables.");
    return; // Allow the request to proceed without protection to avoid 500 error
  }

  try {
    if (!isPublicRoute(req)) await auth.protect();
  } catch (error) {
    console.error("Middleware Invocation Error:", error);
    throw error;
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
