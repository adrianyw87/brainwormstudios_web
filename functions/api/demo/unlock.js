import { corsHeaders, json } from "../../_lib/messages.js";

const DEMO_FILE_ID = "1io1DN61CyVJ1M66d3_LFaXNNyH32t8Jr";
const DEMO_DOWNLOAD_URL = `https://drive.google.com/uc?export=download&confirm=t&id=${DEMO_FILE_ID}`;
const QUESTIONNAIRE_URL = "/docs/cuestionario-tester-free-jefry.pdf";

function demoPass(env) {
  return env.DEMO_PASS || "freejefry@2026";
}

export async function onRequestOptions(context) {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(context.request),
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const headers = corsHeaders(request);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400, headers);
  }

  const password = String(body.password || "");
  if (password !== demoPass(env)) {
    return json({ error: "invalid_password" }, 401, headers);
  }

  return json(
    {
      ok: true,
      demoUrl: DEMO_DOWNLOAD_URL,
      questionnaireUrl: QUESTIONNAIRE_URL,
      fileName: "FreeJefryDemo2026.zip",
    },
    200,
    headers
  );
}
