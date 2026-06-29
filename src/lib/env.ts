export function readEnv(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

export function getIdentityBaseUrl(): string {
  return (readEnv("AUTHTOOLKIT_IDENTITY_BASE_URL") ?? "https://identity.authtoolkit.com").replace(/\/+$/, "");
}

export function getPublicIdentityBaseUrl(): string {
  return (readEnv("NEXT_PUBLIC_AUTHTOOLKIT_IDENTITY_BASE_URL") ?? getIdentityBaseUrl()).replace(/\/+$/, "");
}

export function getIdentityProjectId(): string | undefined {
  return readEnv("AUTHTOOLKIT_IDENTITY_PROJECT_ID");
}

export function getIdentityApiKey(): string | undefined {
  return readEnv("AUTHTOOLKIT_IDENTITY_API_KEY");
}
