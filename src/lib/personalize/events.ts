import { getPersonalizeSdk } from "./index";

declare global {
  interface Window {
    dataLayer?: any[];
  }
}

/**
 * Tracks the "property_view" event for a specific property.
 * 
 * @param slug - The unique identifier of the property page being visited.
 */
export async function trackPropertyView(slug: string, title?: string, category?: string): Promise<void> {
  const sdk = await getPersonalizeSdk();
  if (!sdk) {
    throw new Error("SDK is not initialized");
  }
  
  if (typeof sdk.triggerEvent !== "function") {
    throw new Error("sdk.triggerEvent is not a function");
  }
  
  await sdk.triggerEvent("property_view");

  // Push to GTM dataLayer
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'property_view',
      property_slug: slug,
      property_title: title || '',
      property_category: category || '',
    });
  }
}

/**
 * Tracks the "category_click" event for a specific category.
 * 
 * @param categoryName - The name of the category being clicked (e.g., rent, buy, villas, apartments).
 */
export async function trackCategoryClick(categoryName: string): Promise<void> {
  try {
    const sdk = await getPersonalizeSdk();
    if (!sdk) {
      console.error("[Personalize Event] SDK initialization failed");
      return;
    }
    
    if (typeof sdk.triggerEvent !== "function") {
      console.error("[Personalize Event] SDK initialization failed");
      return;
    }
    
    await sdk.triggerEvent("category_click");

    // Push to GTM dataLayer
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'category_click',
        category_name: categoryName,
      });
    }
  } catch (error) {
    console.error("[Personalize Event] SDK initialization failed");
  }
}

/**
 * Tracks the "cta_click" event for a specific CTA button.
 * 
 * @param ctaName - The display label of the CTA button being clicked.
 */
export async function trackCTAClick(ctaText: string, ctaUrl: string = ''): Promise<void> {
  try {
    const sdk = await getPersonalizeSdk();
    if (!sdk) {
      console.error("[Personalize Event] SDK initialization failed");
      return;
    }
    
    if (typeof sdk.triggerEvent !== "function") {
      console.error("[Personalize Event] SDK initialization failed");
      return;
    }
    
    await sdk.triggerEvent("cta_click");

    // Push to GTM dataLayer
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'cta_click',
        cta_text: ctaText,
        cta_url: ctaUrl,
      });
    }
  } catch (error) {
    console.error("[Personalize Event] SDK initialization failed");
  }
}

// Future expansion methods (Do NOT implement yet):
// export async function trackContactAgent(...): Promise<void> {}
