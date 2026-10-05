export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);

      if (url.pathname === "/__health") {
        return new Response(JSON.stringify({
          ok: true,
          worker: "wellcare-medicose-2-0",
          assetsBinding: Boolean(env?.ASSETS),
          timestamp: new Date().toISOString()
        }), {
          status: 200,
          headers: { "content-type": "application/json; charset=utf-8" }
        });
      }

      if (!env || !env.ASSETS) {
        return new Response("Wellcare Worker: ASSETS binding is missing.", { status: 500 });
      }

      return await env.ASSETS.fetch(request);
    } catch (error) {
      return new Response(
        "Wellcare Worker asset error: " + String(error?.message || error),
        { status: 500 }
      );
    }
  }
};
