import {
  adminCreds,
  corsHeaders,
  createSession,
  json,
} from "../../_lib/messages.js";

export async function onRequestOptions(context) {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(context.request),
  });
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

  const username = String(body.username || "").trim();
  const password = String(body.password || "");
  const { user, pass } = adminCreds(env);

  if (username !== user || password !== pass) {
    return json({ error: "Invalid credentials" }, 401, headers);
  }

  const token = await createSession(env);
  return json({ ok: true, token }, 200, headers);
}
