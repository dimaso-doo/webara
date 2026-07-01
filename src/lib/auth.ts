import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const adminCookieName = "webara_admin";

const devPassword = "admin123";
const devSecret = "webara-dev-secret";

function isProduction() {
  return process.env.NODE_ENV === "production";
}

export function isAdminConfigured() {
  if (!isProduction()) {
    return true;
  }

  return Boolean(process.env.ADMIN_PASSWORD && process.env.AUTH_SECRET);
}

function getSecret() {
  if (isProduction() && !process.env.AUTH_SECRET) {
    throw new Error("AUTH_SECRET is required in production.");
  }

  return process.env.AUTH_SECRET || devSecret;
}

function getPassword() {
  if (isProduction() && !process.env.ADMIN_PASSWORD) {
    throw new Error("ADMIN_PASSWORD is required in production.");
  }

  return process.env.ADMIN_PASSWORD || devPassword;
}

function hashValue(value: string) {
  return createHash("sha256").update(value).digest();
}

export function adminToken() {
  return createHash("sha256").update(`${getPassword()}:${getSecret()}`).digest("hex");
}

export function isValidPassword(password: string) {
  if (!isAdminConfigured()) {
    return false;
  }

  return timingSafeEqual(hashValue(getPassword()), hashValue(password));
}

export async function isAdminLoggedIn() {
  if (!isAdminConfigured()) {
    return false;
  }

  const cookieStore = await cookies();
  return cookieStore.get(adminCookieName)?.value === adminToken();
}
