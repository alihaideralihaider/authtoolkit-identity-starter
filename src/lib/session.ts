import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { getIdentityApiKey, getIdentityProjectId } from "./env";

export const starterSessionCookieName = "atk_identity_starter_session";

export type StarterIdentityUser = {
  id: string;
  email?: string;
  phone?: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
};

export type StarterSession = {
  connectedAt: string;
  identityUser: StarterIdentityUser;
  projectId: string;
  provider: "authtoolkit_identity";
  status: "verified";
};

export async function createStarterSessionCookie(identityUser: StarterIdentityUser): Promise<string> {
  const projectId = getIdentityProjectId();
  if (!projectId) {
    throw new Error("Missing AUTHTOOLKIT_IDENTITY_PROJECT_ID");
  }

  const session: StarterSession = {
    connectedAt: new Date().toISOString(),
    identityUser,
    projectId,
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
    if (
      parsed?.provider === "authtoolkit_identity" &&
      parsed?.status === "verified" &&
      parsed?.identityUser?.id
    ) {
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
  const secret = getIdentityApiKey();
  if (!secret) {
    throw new Error("Missing AUTHTOOLKIT_IDENTITY_API_KEY");
  }
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}
