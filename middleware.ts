import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define routes that would benefit from authentication but don't require it
const isAuthEnabledRoute = createRouteMatcher(['/']);

export default clerkMiddleware(async (auth, req) => {
  // No longer forcing protection on any routes
  // Users can access all routes whether logged in or not
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}; 