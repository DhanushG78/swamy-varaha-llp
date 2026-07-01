"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "@/lib/livePreview";

export default function LivePreviewInit() {
  const router = useRouter();

  useEffect(() => {
    const handleUpdate = () => {
      router.refresh();
    };

    window.addEventListener("contentstack-preview-update", handleUpdate);
    return () => {
      window.removeEventListener("contentstack-preview-update", handleUpdate);
    };
  }, [router]);

  return null;
}
