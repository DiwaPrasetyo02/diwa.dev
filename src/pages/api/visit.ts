import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ cookies }) => {
  const hasVisited = cookies.get("_dv")?.value;

  try {
    const { Redis } = await import("@upstash/redis");
    const redis = new Redis({
      url: import.meta.env.UPSTASH_REDIS_REST_URL,
      token: import.meta.env.UPSTASH_REDIS_REST_TOKEN,
    });

    if (!hasVisited) {
      await redis.incr("visitor_count");
      cookies.set("_dv", "1", {
        path: "/",
        maxAge: 86400,
        httpOnly: true,
        sameSite: "lax",
      });
    }

    const count = (await redis.get<number>("visitor_count")) ?? 0;

    return new Response(JSON.stringify({ count }), {
      headers: { "content-type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ count: null }), {
      headers: { "content-type": "application/json" },
    });
  }
};
