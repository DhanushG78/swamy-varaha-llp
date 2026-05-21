import Contentstack from "contentstack";
import { headers } from "next/headers";

const getSearchParamsFromHeaders = async (): Promise<any> => {
  try {
    const headersList = await headers();
    const urlStr = headersList.get("x-url");
    if (urlStr) {
      const url = new URL(urlStr);
      const params: any = {};
      url.searchParams.forEach((value, key) => {
        params[key] = value;
      });
      return params;
    }
  } catch (e) {
    // Expected error during static generation/build time
  }
  return null;
};

const getStack = async (searchParams?: any) => {
  let params = searchParams;
  if (!params) {
    params = await getSearchParamsFromHeaders();
  }

  const stack = Contentstack.Stack({
    api_key: process.env.CONTENTSTACK_API_KEY || process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY || "",
    delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN || process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN || "",
    environment: process.env.CONTENTSTACK_ENVIRONMENT || process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || "",
    live_preview: {
      enable: process.env.NEXT_PUBLIC_LIVE_PREVIEW_ENABLED === "true",
      preview_token: process.env.CONTENTSTACK_PREVIEW_TOKEN || process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN || "",
      host: "rest-preview.contentstack.com"
    }
  });

  if (params && (params.live_preview || params.preview)) {
    console.log("[CMS] Enabling Contentstack Live Preview with parameters:", params);
    stack.livePreviewQuery(params);
  }

  return stack;
};

export const getFeaturedProperties = async (searchParams?: any) => {
  try {
    console.log("[CMS] getFeaturedProperties called");
    const stack = await getStack(searchParams);
    const Query = stack.ContentType("property").Query();
    Query.where("featured", true).includeReference(["category", "agent"]);
    const result = await Query.toJSON().find();
    console.log("[CMS] getFeaturedProperties loaded", result[0]?.length || 0, "properties");
    return result[0] ?? [];
  } catch (err) {
    console.error("[CMS] getFeaturedProperties failed:", err);
    return [];
  }
};

export const getPropertyBySlug = async (slug: string, searchParams?: any) => {
  try {
    console.log("[CMS] getPropertyBySlug called for:", slug);
    const stack = await getStack(searchParams);
    const Query = stack.ContentType("property").Query();
    Query.where("slug", slug).includeReference(["category", "agent"]);
    const result = await Query.toJSON().find();
    console.log("[CMS] getPropertyBySlug found:", result[0]?.[0] ? "yes" : "no");
    return result[0]?.[0] ?? null;
  } catch (err) {
    console.error("[CMS] getPropertyBySlug failed:", err);
    return null;
  }
};

export const getAllProperties = async (searchParams?: any) => {
  try {
    console.log("[CMS] getAllProperties called");
    const stack = await getStack(searchParams);
    const Query = stack.ContentType("property").Query();
    Query.includeReference(["category", "agent"]);
    const result = await Query.toJSON().find();
    console.log("[CMS] getAllProperties loaded", result[0]?.length || 0, "properties");
    return result[0] ?? [];
  } catch (err) {
    console.error("[CMS] getAllProperties failed:", err);
    return [];
  }
};

export const getAllAgents = async (searchParams?: any) => {
  try {
    console.log("[CMS] getAllAgents called");
    const stack = await getStack(searchParams);
    const Query = stack.ContentType("agent").Query();
    const result = await Query.toJSON().find();
    console.log("[CMS] getAllAgents loaded", result[0]?.length || 0, "agents");
    return result[0] ?? [];
  } catch (err) {
    console.error("[CMS] getAllAgents failed:", err);
    return [];
  }
};

export const getAllCategories = async (searchParams?: any) => {
  try {
    console.log("[CMS] getAllCategories called");
    const stack = await getStack(searchParams);
    const Query = stack.ContentType("category").Query();
    const result = await Query.toJSON().find();
    console.log("[CMS] getAllCategories loaded", result[0]?.length || 0, "categories");
    return result[0] ?? [];
  } catch (err) {
    console.error("[CMS] getAllCategories failed:", err);
    return [];
  }
};

export const getAboutPage = async (searchParams?: any) => {
  try {
    console.log("[CMS] getAboutPage called");
    const stack = await getStack(searchParams);
    const Query = stack.ContentType("about_page").Query();
    const result = await Query.toJSON().find();
    console.log("[CMS] getAboutPage found:", result[0]?.[0] ? "yes" : "no");
    return result[0]?.[0] ?? null;
  } catch (err) {
    console.error("[CMS] getAboutPage failed:", err);
    return null;
  }
};

export const getAchievements = async (searchParams?: any) => {
  try {
    console.log("[CMS] getAchievements called");
    const stack = await getStack(searchParams);
    const Query = stack.ContentType("achievement").Query();
    const result = await Query.toJSON().find();
    console.log("[CMS] getAchievements loaded", result[0]?.length || 0, "achievements");
    return result[0] ?? [];
  } catch (err) {
    console.error("[CMS] getAchievements failed:", err);
    return [];
  }
};

export const getGlobalSettings = async (searchParams?: any) => {
  try {
    console.log("[CMS] getGlobalSettings called");
    const stack = await getStack(searchParams);
    const Query = stack.ContentType("global_settings").Query();
    const result = await Query.toJSON().find();
    console.log("[CMS] getGlobalSettings found:", result[0]?.[0] ? "yes" : "no");
    return result[0]?.[0] ?? null;
  } catch (err) {
    console.error("[CMS] getGlobalSettings failed:", err);
    return null;
  }
};

export const getHomePage = async (searchParams?: any) => {
  try {
    console.log("[CMS] getHomePage called");
    const stack = await getStack(searchParams);
    const Query = stack.ContentType("home_page").Query();
    Query.includeReference([
      "page_sections.categories_section.categories",
      "page_sections.featured_properties_section.properties",
      "page_sections.achievement_section.achievements"
    ]);
    const result = await Query.toJSON().find();
    console.log("[CMS] getHomePage found:", result[0]?.[0] ? "yes" : "no");
    return result[0]?.[0] ?? null;
  } catch (err) {
    console.error("[CMS] getHomePage failed:", err);
    return null;
  }
};
