import {
  corsHeaders,
  getBearerToken,
  isValidSession,
  json,
  readMessages,
  writeMessages,
} from "../../_lib/messages.js";

export async function onRequestOptions(context) {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(context.request),
  });
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const headers = corsHeaders(request);

  if (!env.MESSAGES) {
    return json({ error: "KV binding MESSAGES not configured" }, 500, headers);
  }

  const token = getBearerToken(request);
  if (!(await isValidSession(env, token))) {
    return json({ error: "Unauthorized" }, 401, headers);
  }

  const messages = await readMessages(env);
  messages.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  return json({ messages }, 200, headers);
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const headers = corsHeaders(request);

  if (!env.MESSAGES) {
    return json({ error: "KV binding MESSAGES not configured" }, 500, headers);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400, headers);
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const subject = String(body.subject || "").trim();
  const message = String(body.message || "").trim();

  if (!name || !email || !message) {
    return json({ error: "name, email and message are required" }, 400, headers);
  }

  if (name.length > 200 || email.length > 320 || subject.length > 300 || message.length > 5000) {
    return json({ error: "Field too long" }, 400, headers);
  }

  const entry = {
    id: crypto.randomUUID(),
    name,
    email,
    subject,
    message,
    createdAt: new Date().toISOString(),
  };

  const messages = await readMessages(env);
  messages.push(entry);
  await writeMessages(env, messages);

  return json({ ok: true, id: entry.id }, 201, headers);
}
