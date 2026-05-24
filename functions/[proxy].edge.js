import Personalize from '@contentstack/personalize-edge-sdk';

export default async function handler(request, context) {
  // Check if this request has already been processed by the personalize edge handler to prevent infinite loops
  if (request.headers.get('x-personalize-processed') === 'true') {
    return fetch(request);
  }

  const parsedUrl = new URL(request.url);
  const pathname = parsedUrl.pathname;

  // STEP 2 — Add Static Asset Exclusions & Non-GET Requests
  // Exclude Next.js asset calls, fonts, media, and general static files
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return fetch(request);
  }

  // Bypass immediately for favicon.ico
  if (pathname.includes('favicon.ico')) {
    return fetch(request);
  }

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/assets') ||
    pathname.startsWith('/fonts') ||
    /\.(png|jpg|jpeg|gif|svg|ico|webp|css|js|woff2?|json|txt|map|mp4|mp3|wav|pdf|ttf|otf|eot)$/i.test(pathname)
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
    console.warn('NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_PROJECT_UID is not defined.');
    return fetch(request);
  }

  // Set a custom edge API URL if provided
  const edgeApiUrl = getEnv('NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_EDGE_API_URL');
  if (edgeApiUrl) {
    Personalize.setEdgeApiUrl(edgeApiUrl);
  }

  try {
    // STEP 3 — Initialize Personalize SDK Safely
    const personalizeSdk = await Personalize.init(projectUid, {
      request,
    });

    // Get the variant parameter from the SDK
    const variantParam = personalizeSdk.getVariantParam();
    
    console.log(`[EdgeProxyDebug] Request pathname: ${pathname}`);
    console.log(`[EdgeProxyDebug] Has personalize_variants query param: ${parsedUrl.searchParams.has('personalize_variants')}`);
    console.log(`[EdgeProxyDebug] Generated variantParam: ${variantParam}`);
    
    // Set the variant parameter as a query param in the URL
    parsedUrl.searchParams.set(personalizeSdk.VARIANT_QUERY_PARAM || 'personalize_variants', variantParam);

    // Setup headers with loop prevention and standard x-url for Next.js API/Routing helper
    const headers = new Headers(request.headers);
    headers.set('x-personalize-processed', 'true');
    headers.set('x-url', parsedUrl.toString());

    // STEP 4 — Preserve Existing Request Flow (rewrite the request with the modified URL)
    const modifiedRequest = new Request(parsedUrl.toString(), {
      method: request.method,
      headers: headers,
      body: request.body,
      duplex: request.body ? 'half' : undefined,
    });
    
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
