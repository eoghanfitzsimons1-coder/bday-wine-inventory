import { getStore } from "@netlify/blobs";

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const { key, opened } = await req.json();
  if (!key) return new Response("Missing key", { status: 400 });

  const store = getStore({ name: "tillies-wine", consistency: "strong" });
  let list = await store.get("opened", { type: "json" }) || [];

  if (opened) {
    if (!list.includes(key)) list.push(key);
  } else {
    list = list.filter(k => k !== key);
  }

  await store.setJSON("opened", list);
  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" }
  });
};