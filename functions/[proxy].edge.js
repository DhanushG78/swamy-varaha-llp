import Personalize from '@contentstack/personalize-edge-sdk';

export default async function handler(request, context) {
  const parsedUrl = new URL(request.url);
  const pathname = parsedUrl.pathname;

  // STEP 4 — Add Static Asset Exclusion
  // Exclude Next.js asset calls, favicon, and other static files from personalization
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('favicon.ico') ||
    /\.(png|jpg|jpeg|gif|svg|ico|webp|css|js|woff2?|json|txt|map)$/i.test(pathname)
  ) {
    return fetch(request);
  }

  // Helper to safely get environment variables
  const getEnv = (key) => {
    if (context?.env?.[key]) return context.env[key];
    if (typeof process !== 'undefined' && process.env?.[key]) return process.env[key];
    return undefined;
  };

  // STEP 1 — Read Personalize Project UID
  const projectUid = getEnv('NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_PROJECT_UID');

  if (!projectUid) {
    // If not set, log warning and bypass personalization
    console.warn('NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_PROJECT_UID is not defined.');
    return fetch(request);
  }

  // Set a custom edge API URL if provided
  const edgeApiUrl = getEnv('NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_EDGE_API_URL');
  if (edgeApiUrl) {
    Personalize.setEdgeApiUrl(edgeApiUrl);
  }

  try {
    // STEP 2 — Prepare Edge SDK Initialization
    const personalizeSdk = await Personalize.init(projectUid, {
      request,
    });

    // Get the variant parameter from the SDK
    const variantParam = personalizeSdk.getVariantParam();
    
    // Set the variant parameter as a query param in the URL
    parsedUrl.searchParams.set(personalizeSdk.VARIANT_QUERY_PARAM || 'personalize_variants', variantParam);

    // STEP 3 — Preserve Existing Request Flow (rewrite the request with the modified URL)
    const modifiedRequest = new Request(parsedUrl.toString(), request);
    const response = await fetch(modifiedRequest);

    // Add state cookies to the response and prevent browser caching of personalized responses
    const modifiedResponse = new Response(response.body, response);
    await personalizeSdk.addStateToResponse(modifiedResponse);
    modifiedResponse.headers.set('cache-control', 'no-store');

    return modifiedResponse;
  } catch (error) {
    console.error('Contentstack Personalize Edge error:', error);
    // Graceful fallback to preserve existing request flow
    return fetch(request);
  }
}
