import { NextResponse } from "next/server";
import { getIdentityBaseUrl, getIdentityProjectId } from "../../../../src/lib/env";
import {
  createIdentityState,
  getIdentityStateCookieOptions,
  identityStateCookieName
} from "../../../../src/lib/state";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const identityBaseUrl = getIdentityBaseUrl();
  const projectId = getIdentityProjectId();

  if (!projectId) {
    return NextResponse.redirect(new URL("/login?identity_error=missing_config", requestUrl.origin));
  }

  const callbackUrl = new URL("/auth/identity/callback", requestUrl.origin);
  const state = createIdentityState();

  const identityUrl = new URL("/auth/identity/start", identityBaseUrl);
  identityUrl.searchParams.set("project_id", projectId);
  identityUrl.searchParams.set("return_to", callbackUrl.toString());
  identityUrl.searchParams.set("state", state);

  const response = NextResponse.redirect(identityUrl);
  response.cookies.set(identityStateCookieName, state, getIdentityStateCookieOptions());
  return response;
}
