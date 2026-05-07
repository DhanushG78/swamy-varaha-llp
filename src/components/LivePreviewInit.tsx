"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ContentstackLivePreview from "@contentstack/live-preview-utils";

export default function LivePreviewInit() {
  const router = useRouter();

  useEffect(() => {
    ContentstackLivePreview.init({
      enable: process.env.NEXT_PUBLIC_LIVE_PREVIEW_ENABLED === "true",
      stackDetails: {
        apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY || "",
        environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || "",
      },
      clientUrlParams: {
        host: "rest-preview.contentstack.com",
      },
    });

    ContentstackLivePreview.onEntryChange(() => {
      // Refresh the page on content update for App Router Server Components
      router.refresh();
    });
  }, [router]);

  return null;
}
