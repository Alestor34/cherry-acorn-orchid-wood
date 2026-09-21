import { getCookie, setCookie } from "@tanstack/react-start/server";
import { SignJWT, jwtVerify } from "jose";
import { getSql } from "@/lib/db";
import { hashPassword } from "./hash.server";

export { hashPassword, sha256Hex } from "./hash.server";

const COOKIE = "nazli_admin";
const WEEK = 60 * 60 * 24 * 7;

async function getSetting(key: string): Promise<string | null> {
  const sql = await getSql();
  const rows = await sql<{ value: string }>`select value from site_settings where key = ${key}`;
  return rows[0]?.value ?? null;
}

async function secretKey(): Promise<Uint8Array> {
  const secret = await getSetting("session_secret");
  if (!secret) throw new Error("missing session secret");
  return new TextEncoder().encode(secret);
}

export async function verifyAdminPassword(username: string, password: string): Promise<boolean> {
  const expectedUser = (await getSetting("admin_username")) ?? "admin";
  if (username.trim() !== expectedUser) return false;
  const salt = await getSetting("admin_salt");
  const hash = await getSetting("admin_password_hash");
  if (!salt || !hash) return false;
  const incoming = await hashPassword(password, salt);
  if (incoming.length !== hash.length) return false;
  let diff = 0;
  for (let i = 0; i < incoming.length; i += 1) diff |= incoming.charCodeAt(i) ^ hash.charCodeAt(i);
  return diff === 0;
}

export async function issueAdminCookie(): Promise<void> {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject("admin")
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(await secretKey());
  setCookie(COOKIE, token, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: WEEK,
  });
}

export async function clearAdminCookie(): Promise<void> {
  setCookie(COOKIE, "", {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 0,
  });
}

export async function isAdminSession(): Promise<boolean> {
  const token = getCookie(COOKIE);
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, await secretKey());
    return payload.sub === "admin";
  } catch {
    return false;
  }
}

export async function requireAdmin(): Promise<void> {
  if (!(await isAdminSession())) {
    throw new Error("برای دسترسی به پنل مدیریت وارد شوید.");
  }
}

export async function updateAdminPassword(nextPassword: string): Promise<void> {
  if (nextPassword.trim().length < 6) {
    throw new Error("رمز عبور باید حداقل ۶ کاراکتر باشد.");
  }
  const salt = crypto.randomUUID().replace(/-/g, "");
  const hash = await hashPassword(nextPassword.trim(), salt);
  const sql = await getSql();
  await sql`insert into site_settings (key, value) values ('admin_salt', ${salt})
    on conflict (key) do update set value = excluded.value`;
  await sql`insert into site_settings (key, value) values ('admin_password_hash', ${hash})
    on conflict (key) do update set value = excluded.value`;
}
