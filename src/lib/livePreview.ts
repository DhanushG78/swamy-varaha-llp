import ContentstackLivePreview from "@contentstack/live-preview-utils";

if (typeof window !== "undefined") {
  console.log("[LivePreview] Initializing Contentstack Live Preview globally on client...");
  ContentstackLivePreview.init({
    enable: process.env.NEXT_PUBLIC_LIVE_PREVIEW_ENABLED === "true",
    stackDetails: {
      apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY || "",
      environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || "",
    },
    clientUrlParams: {
      host: "rest-preview.contentstack.com",
    },
    ssr: true,
    debug: true,
  });

  ContentstackLivePreview.onEntryChange(() => {
    console.log("[LivePreview] Entry changed, dispatching event to trigger router.refresh");
    window.dispatchEvent(new CustomEvent("contentstack-preview-update"));
  });
}

export { ContentstackLivePreview };
