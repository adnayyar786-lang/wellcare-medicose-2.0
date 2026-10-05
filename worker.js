export default {
  async fetch(request, env) {
    try {
      if (!env || !env.ASSETS) {
        return new Response("Wellcare Worker: ASSETS binding is missing.", { status: 500 });
      }
      return await env.ASSETS.fetch(request);
    } catch (error) {
      return new Response("Wellcare Worker asset error: " + String(error?.message || error), { status: 500 });
    }
  }
};
