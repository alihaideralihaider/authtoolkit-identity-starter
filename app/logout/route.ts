import { NextResponse } from "next/server";
import { starterSessionCookieName } from "../../src/lib/session";
import { getClearIdentityStateCookieOptions, identityStateCookieName } from "../../src/lib/state";

export async function POST(request: Request) {
  return clearAndRedirect(request);
}

export async function GET(request: Request) {
  return clearAndRedirect(request);
}

function clearAndRedirect(request: Request) {
  const response = NextResponse.redirect(new URL("/login?logged_out=1", request.url));
  response.cookies.set(starterSessionCookieName, "", { path: "/", maxAge: 0 });
  response.cookies.set(identityStateCookieName, "", getClearIdentityStateCookieOptions());
  return response;
}
