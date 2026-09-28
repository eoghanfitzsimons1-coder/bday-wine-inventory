import { getStore } from "@netlify/blobs";

export default async () => {
  // Must be inside the handler, not at module scope
  const store = getStore({ name: "tillies-wine", consistency: "strong" });
  
  const opened = await store.get("opened", { type: "json" });
  
  return new Response(JSON.stringify(opened || []), {
    headers: { "Content-Type": "application/json" }
  });
};