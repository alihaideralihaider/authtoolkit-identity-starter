import { NextResponse } from "next/server";
import {
  createStarterSessionCookie,
  getSessionCookieOptions,
  starterSessionCookieName
} from "../../../../src/lib/session";

type CallbackState = "failed" | "missing" | "pending" | "verified";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const state = classifyCallbackState(url);
  const response = new NextResponse(renderCallbackHtml(state), {
    headers: { "Content-Type": "text/html; charset=utf-8" }
  });

  if (state === "verified") {
    try {
      response.cookies.set(starterSessionCookieName, await createStarterSessionCookie(), getSessionCookieOptions());
    } catch {
      return new NextResponse(renderCallbackHtml("failed"), {
        headers: { "Content-Type": "text/html; charset=utf-8" },
        status: 500
      });
    }
  }

  return response;
}

function classifyCallbackState(url: URL): CallbackState {
  // Customize this when your Identity project returns its final verified payload.
  // Keep this route strict and never trust arbitrary query params as user data.
  const status = url.searchParams.get("status") ?? url.searchParams.get("identity_status");
  const verified = url.searchParams.get("verified");
  const state = url.searchParams.get("state");

  if (status === "verified" || verified === "true") return "verified";
  if (status === "pending") return "pending";
  if (status === "failed" || status === "error") return "failed";
  if (state) return "pending";
  return "missing";
}

function renderCallbackHtml(state: CallbackState): string {
  const model = {
    verified: {
      badge: "Verified",
      heading: "Identity connected",
      body: "AuthToolkit Identity returned a verified result. A minimal starter session was created.",
      action: "Open protected app",
      href: "/app"
    },
    pending: {
      badge: "Pending",
      heading: "Identity result pending",
      body: "The starter received Identity context, but this demo route did not receive a final verified result yet.",
      action: "Try again",
      href: "/login"
    },
    missing: {
      badge: "Missing",
      heading: "Missing Identity result",
      body: "This callback is missing the expected Identity result. Start again from the login page.",
      action: "Back to login",
      href: "/login"
    },
    failed: {
      badge: "Failed",
      heading: "Identity sign-in failed",
      body: "The starter could not complete Identity sign-in safely. Start again from the login page.",
      action: "Back to login",
      href: "/login"
    }
  }[state];

  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${model.heading}</title><style>body{margin:0;background:#f6f3ea;color:#15221b;font-family:Georgia,serif}.shell{width:min(860px,calc(100% - 2rem));margin:0 auto;padding:3rem 0}.card{background:#fffdf7;border:1px solid #ded6c5;padding:1.5rem;box-shadow:8px 8px 0 #d8ccb3}.badge{display:inline-flex;background:#e5f2e8;color:#145a42;padding:.35rem .6rem;font:700 .85rem system-ui}h1{font-size:clamp(2.4rem,8vw,4.5rem);line-height:.95}p{color:#647067;font-size:1.05rem;line-height:1.7}.button{display:inline-flex;background:#0f6b4f;color:white;padding:.85rem 1.1rem;text-decoration:none;font-weight:700}</style></head><body><main class="shell"><section class="card"><span class="badge">${model.badge}</span><h1>${model.heading}</h1><p>${model.body}</p><p>This starter does not expose raw Identity responses, secrets, or provider errors.</p><a class="button" href="${model.href}">${model.action}</a></section></main></body></html>`;
}
