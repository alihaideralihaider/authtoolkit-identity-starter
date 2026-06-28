import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { readEnv } from "./env";

export const starterSessionCookieName = "atk_identity_starter_session";

type StarterSession = {
  connectedAt: string;
  provider: "authtoolkit_identity";
  status: "verified";
};

export async function createStarterSessionCookie(): Promise<string> {
  const session: StarterSession = {
    connectedAt: new Date().toISOString(),
    provider: "authtoolkit_identity",
    status: "verified"
  };
  const payload = Buffer.from(JSON.stringify(session), "utf8").toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export async function getStarterSession(): Promise<StarterSession | null> {
  const cookieStore = await cookies();
  const value = cookieStore.get(starterSessionCookieName)?.value;
  if (!value) return null;

  const [payload, signature] = value.split(".");
  if (!payload || !signature || !safeEqual(signature, sign(payload))) return null;

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (parsed?.provider === "authtoolkit_identity" && parsed?.status === "verified") {
      return parsed as StarterSession;
    }
  } catch {
    return null;
  }

  return null;
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  };
}

function sign(payload: string): string {
  const secret = readEnv("AUTHTOOLKIT_IDENTITY_SESSION_SECRET");
  if (!secret) {
    throw new Error("Missing AUTHTOOLKIT_IDENTITY_SESSION_SECRET");
  }
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}
