"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "@/lib/livePreview";

export default function LivePreviewInit() {
  const router = useRouter();

  useEffect(() => {
    const handleUpdate = () => {
      console.log("[LivePreviewInit] Received update event. Refreshing router data...");
      router.refresh();
    };

    window.addEventListener("contentstack-preview-update", handleUpdate);
    return () => {
      window.removeEventListener("contentstack-preview-update", handleUpdate);
    };
  }, [router]);

  return null;
}
