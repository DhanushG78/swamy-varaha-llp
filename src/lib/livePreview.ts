import ContentstackLivePreview from "@contentstack/live-preview-utils";

if (typeof window !== "undefined") {
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
    debug: false,
  });

  ContentstackLivePreview.onEntryChange(() => {
    window.dispatchEvent(new CustomEvent("contentstack-preview-update"));
  });
}

export { ContentstackLivePreview };
