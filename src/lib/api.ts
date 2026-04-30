import Contentstack from "contentstack";

const Stack = Contentstack.Stack({
  api_key: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY!,
  delivery_token: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN!,
  environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT!,
});

export const getFeaturedProperties = async () => {
  try {
    const Query = Stack.ContentType("property").Query();
    Query.where("featured", true).includeReference(["category", "agent"]);
    const result = await Query.toJSON().find();
    return result[0] ?? [];
  } catch (err) {
    console.error("[CMS] getFeaturedProperties failed:", err);
    return [];
  }
};

export const getPropertyBySlug = async (slug: string) => {
  try {
    const Query = Stack.ContentType("property").Query();
    Query.where("slug", slug).includeReference(["category", "agent"]);
    const result = await Query.toJSON().find();
    return result[0]?.[0] ?? null;
  } catch (err) {
    console.error("[CMS] getPropertyBySlug failed:", err);
    return null;
  }
};

export const getAllProperties = async () => {
  try {
    const Query = Stack.ContentType("property").Query();
    Query.includeReference(["category", "agent"]);
    const result = await Query.toJSON().find();
    return result[0] ?? [];
  } catch (err) {
    console.error("[CMS] getAllProperties failed:", err);
    return [];
  }
};

export const getAllAgents = async () => {
  try {
    const Query = Stack.ContentType("agent").Query();
    const result = await Query.toJSON().find();
    return result[0] ?? [];
  } catch (err) {
    console.error("[CMS] getAllAgents failed:", err);
    return [];
  }
};

export const getAllCategories = async () => {
  try {
    const Query = Stack.ContentType("category").Query();
    const result = await Query.toJSON().find();
    return result[0] ?? [];
  } catch (err) {
    console.error("[CMS] getAllCategories failed:", err);
    return [];
  }
};

export const getAboutPage = async () => {
  try {
    const Query = Stack.ContentType("about_page").Query();
    const result = await Query.toJSON().find();
    return result[0]?.[0] ?? null;
  } catch (err) {
    console.error("[CMS] getAboutPage failed:", err);
    return null;
  }
};

export const getAchievements = async () => {
  try {
    const Query = Stack.ContentType("achievement").Query();
    const result = await Query.toJSON().find();
    return result[0] ?? [];
  } catch (err) {
    console.error("[CMS] getAchievements failed:", err);
    return [];
  }
};

export const getGlobalSettings = async () => {
  try {
    const Query = Stack.ContentType("global_settings").Query();
    const result = await Query.toJSON().find();
    return result[0]?.[0] ?? null;
  } catch (err) {
    console.error("[CMS] getGlobalSettings failed:", err);
    return null;
  }
};

export default Stack;
