import { NextResponse, type NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { checkUserDetails } from "./utils/functions/checkUserDetails";




export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const url = new URL(request.nextUrl);

 
  if (session) {
    const userDetails = await supabase
      .from("users")
      .select()
      .eq("id", session?.user.id);
    
      if (
        !checkUserDetails(userDetails?.data?.[0]) &&
        url.pathname !== "/profile"
      ) {
        return NextResponse.redirect(new URL("/profile", request.url));
      }
 

  return NextResponse.next();
}
}
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|logo.png|sw.js).*)",
  ],
}