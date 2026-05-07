import Contentstack from "contentstack";

const Stack = Contentstack.Stack({
  api_key: process.env.CONTENTSTACK_API_KEY || process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY || "",
  delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN || process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN || "",
  environment: process.env.CONTENTSTACK_ENVIRONMENT || process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || "",
  live_preview: {
    enable: process.env.NEXT_PUBLIC_LIVE_PREVIEW_ENABLED === "true",
    preview_token: process.env.CONTENTSTACK_PREVIEW_TOKEN || "",
    host: "rest-preview.contentstack.com"
  }
});

const setPreview = (query: any, searchParams?: any) => {
  if (searchParams?.live_preview) {
    Stack.livePreviewQuery(searchParams);
  }
};

export const getFeaturedProperties = async (searchParams?: any) => {
  try {
    const Query = Stack.ContentType("property").Query();
    setPreview(Query, searchParams);
    Query.where("featured", true).includeReference(["category", "agent"]);
    const result = await Query.toJSON().find();
    return result[0] ?? [];
  } catch (err) {
    console.error("[CMS] getFeaturedProperties failed:", err);
    return [];
  }
};

export const getPropertyBySlug = async (slug: string, searchParams?: any) => {
  try {
    const Query = Stack.ContentType("property").Query();
    setPreview(Query, searchParams);
    Query.where("slug", slug).includeReference(["category", "agent"]);
    const result = await Query.toJSON().find();
    return result[0]?.[0] ?? null;
  } catch (err) {
    console.error("[CMS] getPropertyBySlug failed:", err);
    return null;
  }
};

export const getAllProperties = async (searchParams?: any) => {
  try {
    const Query = Stack.ContentType("property").Query();
    setPreview(Query, searchParams);
    Query.includeReference(["category", "agent"]);
    const result = await Query.toJSON().find();
    return result[0] ?? [];
  } catch (err) {
    console.error("[CMS] getAllProperties failed:", err);
    return [];
  }
};

export const getAllAgents = async (searchParams?: any) => {
  try {
    const Query = Stack.ContentType("agent").Query();
    setPreview(Query, searchParams);
    const result = await Query.toJSON().find();
    return result[0] ?? [];
  } catch (err) {
    console.error("[CMS] getAllAgents failed:", err);
    return [];
  }
};

export const getAllCategories = async (searchParams?: any) => {
  try {
    const Query = Stack.ContentType("category").Query();
    setPreview(Query, searchParams);
    const result = await Query.toJSON().find();
    return result[0] ?? [];
  } catch (err) {
    console.error("[CMS] getAllCategories failed:", err);
    return [];
  }
};

export const getAboutPage = async (searchParams?: any) => {
  try {
    const Query = Stack.ContentType("about_page").Query();
    setPreview(Query, searchParams);
    const result = await Query.toJSON().find();
    return result[0]?.[0] ?? null;
  } catch (err) {
    console.error("[CMS] getAboutPage failed:", err);
    return null;
  }
};

export const getAchievements = async (searchParams?: any) => {
  try {
    const Query = Stack.ContentType("achievement").Query();
    setPreview(Query, searchParams);
    const result = await Query.toJSON().find();
    return result[0] ?? [];
  } catch (err) {
    console.error("[CMS] getAchievements failed:", err);
    return [];
  }
};

export const getGlobalSettings = async (searchParams?: any) => {
  try {
    const Query = Stack.ContentType("global_settings").Query();
    setPreview(Query, searchParams);
    const result = await Query.toJSON().find();
    return result[0]?.[0] ?? null;
  } catch (err) {
    console.error("[CMS] getGlobalSettings failed:", err);
    return null;
  }
};

export default Stack;
