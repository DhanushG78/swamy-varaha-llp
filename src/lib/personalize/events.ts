import { getPersonalizeSdk } from "./index";

/**
 * Tracks the "property_view" event for a specific property.
 * 
 * @param slug - The unique identifier of the property page being visited.
 */
export async function trackPropertyView(slug: string): Promise<void> {
  const sdk = await getPersonalizeSdk();
  if (!sdk) {
    throw new Error("SDK is not initialized");
  }
  
  if (typeof sdk.triggerEvent !== "function") {
    throw new Error("sdk.triggerEvent is not a function");
  }
  
  await sdk.triggerEvent("property_view");
}

// Future expansion methods (Do NOT implement yet):
// export async function trackCategoryClick(...): Promise<void> {}
// export async function trackCTAClick(...): Promise<void> {}
// export async function trackContactAgent(...): Promise<void> {}
