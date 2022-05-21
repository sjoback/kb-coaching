import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";
export async function middleware(req) {
   if (req.nextUrl.pathname.includes("/workouts")) {
      const session = await getSession({ req });
      if (!session) return NextResponse.redirect("/auth/signin");
   }
   return NextResponse.next();
}
