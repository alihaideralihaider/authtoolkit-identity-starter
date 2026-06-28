import { NextResponse } from "next/server";
import { getIdentityBaseUrl } from "../../../../src/lib/env";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const callbackUrl = new URL("/auth/identity/callback", requestUrl.origin);

  // Generic hosted Identity starter URL. If your Identity project exposes a
  // product-specific start endpoint, replace this with that endpoint.
  const identityUrl = new URL("/identity", getIdentityBaseUrl());
  identityUrl.searchParams.set("app", "starter");
  identityUrl.searchParams.set("source", "starter");
  identityUrl.searchParams.set("return_to", callbackUrl.toString());

  return NextResponse.redirect(identityUrl);
}
