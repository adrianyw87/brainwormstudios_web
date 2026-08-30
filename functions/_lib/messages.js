const MESSAGES_KEY = "messages";
const SESSION_PREFIX = "session:";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

export function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...extraHeaders,
    },
  });
}

export function corsHeaders(request) {
  const origin = request.headers.get("Origin") || "*";
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  };
}

export function adminCreds(env) {
  return {
    user: env.ADMIN_USER || "admin",
    pass: env.ADMIN_PASS || "123admin",
  };
}

export async function readMessages(env) {
  const raw = await env.MESSAGES.get(MESSAGES_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function writeMessages(env, messages) {
  await env.MESSAGES.put(MESSAGES_KEY, JSON.stringify(messages));
}

export function getBearerToken(request) {
  const header = request.headers.get("Authorization") || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match ? match[1].trim() : null;
}

export async function isValidSession(env, token) {
  if (!token) return false;
  const value = await env.MESSAGES.get(`${SESSION_PREFIX}${token}`);
  return Boolean(value);
}

export async function createSession(env) {
  const token = crypto.randomUUID() + crypto.randomUUID();
  await env.MESSAGES.put(`${SESSION_PREFIX}${token}`, "1", {
    expirationTtl: SESSION_TTL_SECONDS,
  });
  return token;
}
