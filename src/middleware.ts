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

  if (!session) {
    if (url.pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  if (session) {
    const userDetails = await supabase
      .from("users")
      .select()
      .eq("id", session?.user.id);

    const userRoles = await supabase
      .from("roles")
      .select("role")
      .eq("id", session?.user.id);


    if (
      !checkUserDetails(userDetails?.data?.[0]) &&
      url.pathname !== "/profile"
    ) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }


    let superAdmin = false;
    let eventCoordinator = false;
    if (userRoles.data && Array.isArray(userRoles.data)) {
      for (const obj of userRoles.data) {
        if (obj.role === "admin") {
          superAdmin = true;
        } else if (obj.role === "coordinator") {
          eventCoordinator = true;
        }
      }
    }

    if (superAdmin && url.pathname.startsWith("/admin")) {
      return NextResponse.next();
    }

    if (eventCoordinator && url.pathname.startsWith("/admin")) {
      return NextResponse.next();
    }

    if (
      (!superAdmin || !eventCoordinator) &&
      url.pathname.startsWith("/admin")
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }
}
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|logo.png|sw.js).*)",
  ],
};
