import { NextResponse } from "next/server";
import { starterSessionCookieName } from "../../src/lib/session";

export async function POST(request: Request) {
  return clearAndRedirect(request);
}

export async function GET(request: Request) {
  return clearAndRedirect(request);
}

function clearAndRedirect(request: Request) {
  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.set(starterSessionCookieName, "", { path: "/", maxAge: 0 });
  return response;
}
