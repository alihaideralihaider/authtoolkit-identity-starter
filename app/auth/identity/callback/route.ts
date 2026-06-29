import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getIdentityApiKey, getIdentityBaseUrl, getIdentityProjectId } from "../../../../src/lib/env";
import {
  createStarterSessionCookie,
  getSessionCookieOptions,
  type StarterIdentityUser,
  starterSessionCookieName
} from "../../../../src/lib/session";
import {
  getClearIdentityStateCookieOptions,
  identityStateCookieName
} from "../../../../src/lib/state";

type ExchangeResponse = {
  ok?: boolean;
  identityUser?: StarterIdentityUser;
  error?: {
    code?: string;
    message?: string;
  };
};

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const state = requestUrl.searchParams.get("state");
  const cookieStore = await cookies();
  const storedState = cookieStore.get(identityStateCookieName)?.value;

  if (!code || !state || !storedState || state !== storedState) {
    return redirectToLogin(requestUrl, "invalid_state");
  }

  const projectId = getIdentityProjectId();
  const apiKey = getIdentityApiKey();
  if (!projectId || !apiKey) {
    return redirectToLogin(requestUrl, "missing_config");
  }

  const redirectUri = new URL("/auth/identity/callback", requestUrl.origin).toString();
  const exchangeUrl = new URL("/api/identity/callback/exchange", getIdentityBaseUrl());
  const exchangeResult = await exchangeCallbackCode(exchangeUrl, {
    apiKey,
    code,
    projectId,
    redirectUri,
    state
  });

  if (!exchangeResult.ok) {
    return redirectToLogin(requestUrl, exchangeResult.errorCode);
  }

  const response = NextResponse.redirect(new URL("/app", requestUrl.origin));
  response.cookies.set(starterSessionCookieName, await createStarterSessionCookie(exchangeResult.identityUser), getSessionCookieOptions());
  response.cookies.set(identityStateCookieName, "", getClearIdentityStateCookieOptions());
  return response;
}

async function exchangeCallbackCode(
  exchangeUrl: URL,
  input: {
    apiKey: string;
    code: string;
    projectId: string;
    redirectUri: string;
    state: string;
  }
): Promise<
  | { ok: true; identityUser: StarterIdentityUser }
  | { ok: false; errorCode: string }
> {
  try {
    const exchangeResponse = await fetch(exchangeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${input.apiKey}`
      },
      body: JSON.stringify({
        projectId: input.projectId,
        code: input.code,
        state: input.state,
        redirectUri: input.redirectUri
      })
    });
    const result = (await exchangeResponse.json().catch(() => null)) as ExchangeResponse | null;

    if (!exchangeResponse.ok || !result?.ok || !result.identityUser?.id) {
      return { ok: false, errorCode: result?.error?.code ?? "exchange_failed" };
    }

    return { ok: true, identityUser: result.identityUser };
  } catch {
    return { ok: false, errorCode: "exchange_failed" };
  }
}

function redirectToLogin(requestUrl: URL, error: string): NextResponse {
  const loginUrl = new URL("/login", requestUrl.origin);
  loginUrl.searchParams.set("identity_error", error);
  const response = NextResponse.redirect(loginUrl);
  response.cookies.set(identityStateCookieName, "", getClearIdentityStateCookieOptions());
  return response;
}
