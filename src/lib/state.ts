import { randomBytes } from "node:crypto";

export const identityStateCookieName = "atk_identity_starter_state";

export function createIdentityState(): string {
  return randomBytes(32).toString("base64url");
}

export function getIdentityStateCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/auth/identity",
    maxAge: 10 * 60
  };
}

export function getClearIdentityStateCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/auth/identity",
    maxAge: 0
  };
}
