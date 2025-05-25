import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "./app/(server)/action/get-current-user.controller";

export default async function middleware(req: NextRequest) {
  const user = await getCurrentUser();

  if (user) {
    if (!req.nextUrl.pathname.endsWith("dashboard")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  } else {
    if (req.nextUrl.pathname.endsWith("dashboard")) {
      return NextResponse.redirect(new URL("/?error=session-expired", req.url));
    }
  }
}

export const config = {
  matcher: ["/login", "/register", "/dashboard"],
};
