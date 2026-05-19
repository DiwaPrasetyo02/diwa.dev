import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ cookies }) => {
  const hasVisited = cookies.get("_dv")?.value;

  try {
    const { kv } = await import("@vercel/kv");

    if (!hasVisited) {
      await kv.incr("visitor_count");
      cookies.set("_dv", "1", {
        path: "/",
        maxAge: 86400,
        httpOnly: true,
        sameSite: "lax",
      });
    }

    const count = (await kv.get<number>("visitor_count")) ?? 0;

    return new Response(JSON.stringify({ count }), {
      headers: { "content-type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ count: null }), {
      headers: { "content-type": "application/json" },
    });
  }
};
