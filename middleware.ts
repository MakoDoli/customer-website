// import { NextResponse } from "next/server";

import { auth } from "./app/_lib/auth";

// middleware function has access to all/any request of all routes

// export function middleware(req: Request) {
//   return NextResponse.redirect(new URL("/about", req.url));
// }

export const middleware = auth;
export const config = {
  matcher: ["/account"],
};
