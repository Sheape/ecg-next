import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // TODO: Remove /assistant/new route later
  publicRoutes: ['/', '/home', '/about', '/usage', '/assistant/new', '/sign-up', '/sign-in']
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
