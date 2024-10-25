import { clerkMiddleware,createRouteMatcher } from "@clerk/nextjs/server";
const isProteceted = createRouteMatcher(["/dashboard(.*)"]);
export default clerkMiddleware((auth,request)=>{
    if (isProteceted(request)) auth().protect;
});
export const config = {
    matcher:["/((?!.+\\.[\\w]+$|_next).*)","/","/(api|trpc)(.*)"],};