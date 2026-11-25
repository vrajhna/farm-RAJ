// Cloudflare Worker: serves static frontend (public/) + proxies /api/* to Railway backend.
// Set BACKEND_URL in Worker Settings → Variables (e.g. https://farm-raj-production-xxxx.up.railway.app).
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/')) {
      const back = (env.BACKEND_URL || '').replace(/\/+$/, '');
      if (!back) {
        return new Response(JSON.stringify({ error: 'backend not configured', hint: 'Set BACKEND_URL in Worker Variables to the Railway URL' }), {
          status: 503, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }
      const target = back + url.pathname + url.search;
      const headers = new Headers(request.headers);
      headers.delete('host');
      const init = { method: request.method, headers, redirect: 'follow' };
      if (request.method !== 'GET' && request.method !== 'HEAD') init.body = request.body;
      try {
        const upstream = await fetch(target, init);
        const out = new Headers(upstream.headers);
        out.set('Access-Control-Allow-Origin', '*');
        out.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
        out.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        return new Response(upstream.body, { status: upstream.status, headers: out });
      } catch (e) {
        return new Response(JSON.stringify({ error: 'backend unreachable' }), {
          status: 502, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }
    }
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: {
        'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization' } });
    }
    return env.ASSETS.fetch(request);
  }
};
