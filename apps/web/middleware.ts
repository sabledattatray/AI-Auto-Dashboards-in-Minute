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
