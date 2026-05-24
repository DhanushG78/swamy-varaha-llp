import Personalize from '@contentstack/personalize-edge-sdk';

export const PROJECT_UID = process.env.NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_PROJECT_UID || '69faed8e2e9d553897812d69';
export const EDGE_API_URL = process.env.NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_EDGE_API_URL || '';

let sdkInstance: any = null;

/**
 * Get or initialize the Personalize SDK client instance.
 * Safe to be called on both client and server side.
 */
export async function getPersonalizeSdk() {
  if (typeof window === 'undefined') {
    // Server-side: return a new instance of the SDK
    if (!PROJECT_UID) {
      console.warn('NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_PROJECT_UID is not defined.');
    }
    if (EDGE_API_URL) {
      Personalize.setEdgeApiUrl(EDGE_API_URL);
    }
    return await Personalize.init(PROJECT_UID);
  }

  // Client-side singleton pattern
  if (!sdkInstance) {
    if (!PROJECT_UID) {
      console.warn('NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_PROJECT_UID is not defined.');
    }
    if (EDGE_API_URL) {
      Personalize.setEdgeApiUrl(EDGE_API_URL);
    }
    sdkInstance = await Personalize.init(PROJECT_UID);
  }
  return sdkInstance;
}

/**
 * Decodes variant query parameter string into an array of variant aliases
 * that can be passed to Contentstack Delivery SDK.
 */
export function getVariantAliasesFromParam(variantParam: string): string[] {
  if (!variantParam) return [];
  try {
    return Personalize.variantParamToVariantAliases(variantParam);
  } catch (error) {
    console.error('Failed to parse variant param:', error);
    return [];
  }
}

/**
 * Helper to get the personalization query parameter key from the SDK.
 */
export const VARIANT_QUERY_PARAM = 'personalize_variants';
