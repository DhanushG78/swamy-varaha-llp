import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Personalize from '@contentstack/personalize-edge-sdk';

export async function middleware(request: NextRequest) {
  // Prevent infinite loops
  if (request.headers.get('x-personalize-processed') === 'true') {
    return NextResponse.next();
  }

  const parsedUrl = new URL(request.url);
  const pathname = parsedUrl.pathname;

  // Static assets and non-GET requests exclusions
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return NextResponse.next();
  }

  if (pathname.includes('favicon.ico')) {
    return NextResponse.next();
  }

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/assets') ||
    pathname.startsWith('/fonts') ||
    /\.(png|jpg|jpeg|gif|svg|ico|webp|css|js|woff2?|json|txt|map|mp4|mp3|wav|pdf|ttf|otf|eot)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  const projectUid = process.env.NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_PROJECT_UID || '69faed8e2e9d553897812d69';

  if (!projectUid) {
    console.warn('NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_PROJECT_UID is not defined.');
    return NextResponse.next();
  }

  const edgeApiUrl = process.env.NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_EDGE_API_URL;
  if (edgeApiUrl) {
    Personalize.setEdgeApiUrl(edgeApiUrl);
  }

  try {
    // Initialize Personalize SDK Safely
    const personalizeSdk = await Personalize.init(projectUid, {
      request,
    });

    const variantParam = personalizeSdk.getVariantParam();
    parsedUrl.searchParams.set(personalizeSdk.VARIANT_QUERY_PARAM || 'personalize_variants', variantParam);

    // Setup request headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-personalize-processed', 'true');
    requestHeaders.set('x-url', parsedUrl.toString());

    // Rewrite URL
    const response = NextResponse.rewrite(parsedUrl, {
      request: {
        headers: requestHeaders,
      },
    });

    // Save state back to cookies
    await personalizeSdk.addStateToResponse(response);
    response.headers.set('cache-control', 'no-store');

    return response;
  } catch (error) {
    console.error('Contentstack Personalize Edge error in local middleware:', error);
    // Graceful fallback to default headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-url', request.url);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      }
    });
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
