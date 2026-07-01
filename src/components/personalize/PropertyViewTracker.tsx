"use client";

import { useEffect } from "react";
import { getPersonalizeSdk } from "@/lib/personalize";
import { trackPropertyView } from "@/lib/personalize/events";

interface PropertyViewTrackerProps {
  slug: string;
  title?: string;
  category?: string;
}

export default function PropertyViewTracker({ slug, title, category }: PropertyViewTrackerProps) {
  useEffect(() => {
    let isCurrent = true;

    const executeTracking = async () => {
      const sessionKey = `property-view-${slug}`;

      if (typeof window !== "undefined" && sessionStorage.getItem(sessionKey)) {
        return;
      }

      try {
        // 2. Initialize SDK
        const sdk = await getPersonalizeSdk();
        if (!sdk) {
          console.warn("[Personalize Event] SDK initialization failed (SDK returned null/undefined)");
          return;
        }

        // Prevent firing if component unmounted while SDK was initializing
        if (!isCurrent) return;

        // 3. Fire the property_view event
        await trackPropertyView(slug, title, category);

        // 4. Mark as tracked in sessionStorage
        if (typeof window !== "undefined") {
          sessionStorage.setItem(sessionKey, "true");
        }
      } catch (error: any) {
        console.error(`[Personalize Event] SDK initialization failed: ${error?.message || error}`);
      }
    };

    executeTracking();

    return () => {
      isCurrent = false;
    };
  }, [slug]);

  return null;
}
