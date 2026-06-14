import Contentstack from "contentstack";
import { headers } from "next/headers";
import { getVariantAliasesFromParam } from "@/lib/personalize";

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
  let params = { ...(searchParams || {}) };
  const headerParams = await getSearchParamsFromHeaders();
  if (headerParams) {
    params = { ...headerParams, ...params };
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
    let params = { ...(searchParams || {}) };
    const headerParams = await getSearchParamsFromHeaders();
    if (headerParams) {
      params = { ...headerParams, ...params };
    }
    console.log("[CMS] getHomePage extracted search params:", params);

    const stack = await getStack(params);
    const Query = stack.ContentType("home_page").Query();
    Query.includeReference([
      "page_sections.categories_section.categories",
      "page_sections.featured_properties_section.properties",
      "page_sections.achievement_section.achievements"
    ]);

    // Apply variants if query parameter exists
    if (params?.personalize_variants) {
      const aliases = getVariantAliasesFromParam(params.personalize_variants);
      console.log("[CMS] Found personalize_variants query param. Decoded aliases:", aliases);
      if (aliases && aliases.length > 0) {
        console.log("Variant aliases:", aliases);
        Query.variants(aliases);
        console.log("[CMS] Applied Query.variants(aliases) on Query");
      }
    } else {
      console.log("[CMS] No personalize_variants query param found in params.");
    }

    const result = await Query.toJSON().find();
    console.log("[CMS] getHomePage found entry:", result[0]?.[0] ? "yes" : "no");
    if (result[0]?.[0]) {
      const entry = result[0][0];
      
      // Secondary fetch for CTA-specific variant background video if needed due to Asset Overlap in Delivery API
      if (params?.personalize_variants) {
        const aliases = getVariantAliasesFromParam(params.personalize_variants);
        const ctaAlias = aliases.find((alias: string) => alias.startsWith("cs_personalize_3_"));
        if (ctaAlias) {
          console.log("[CMS] Secondary fetch for CTA-specific variant to resolve Asset Overlap:", ctaAlias);
          try {
            const ctaQuery = stack.ContentType("home_page").Query();
            ctaQuery.variants([ctaAlias]);
            const ctaResult = await ctaQuery.toJSON().find();
            const ctaEntry = ctaResult[0]?.[0];
            if (ctaEntry) {
              const ctaHeroSec = ctaEntry.page_sections?.find((s: any) => s.hero_section)?.hero_section;
              if (ctaHeroSec?.background_video) {
                console.log("[CMS] Found cta_background_video in secondary fetch:", ctaHeroSec.background_video.filename || ctaHeroSec.background_video);
                entry.cta_background_video = ctaHeroSec.background_video;
              }
            }
          } catch (ctaErr) {
            console.error("[CMS] Secondary fetch for CTA personalization failed:", ctaErr);
          }
        }
      }

      console.log("[CMS] Returned entry title:", entry.title);
      console.log("[CMS] Returned entry publish details variants:", entry.publish_details?.variants);
      const heroSec = entry.page_sections?.find((s: any) => s.hero_section);
      if (heroSec) {
        console.log("[CMS] Hero section heading in CDA response:", heroSec.hero_section?.heading);
      }

      // STEP 1 — Add Deep CTA Payload Logging
      const ctaSec = entry.page_sections?.find((s: any) => s.cta_banner_section);
      if (ctaSec) {
        console.log("[CMS] Deep CTA Payload Logging:");
        console.log("[CMS] Full CTA Section Payload:", JSON.stringify(ctaSec, null, 2));
        console.log("[CMS] cta_heading:", ctaSec.cta_banner_section?.cta_heading);
        console.log("[CMS] cta_description:", ctaSec.cta_banner_section?.cta_description);
        console.log("[CMS] cta_button_text:", ctaSec.cta_banner_section?.cta_button_text);
        console.log("[CMS] cta_button_link:", ctaSec.cta_banner_section?.cta_button_link);
        console.log("[CMS] background_video:", ctaSec.cta_banner_section?.background_video);
      }
    }
    return result[0]?.[0] ?? null;
  } catch (err) {
    console.error("[CMS] getHomePage failed:", err);
    return null;
  }
};
