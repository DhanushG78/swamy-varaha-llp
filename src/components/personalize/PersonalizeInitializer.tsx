"use client";

import { useEffect } from "react";
import { getPersonalizeSdk } from "@/lib/personalize";

export default function PersonalizeInitializer() {
  useEffect(() => {
    const initializeVisitor = async () => {
      try {
        const sdk = await getPersonalizeSdk();
        if (!sdk) {
          console.warn("[PersonalizeInitializer] SDK is not initialized.");
          return;
        }

        const hasVisited = localStorage.getItem("hasVisited");
        const justClassifiedNew = sessionStorage.getItem("just_classified_new");
        const activeType = localStorage.getItem("active_visitor_type");

        if (!hasVisited) {
          // First-time visitor classification
          console.log("[PersonalizeInitializer] Classifying as first-time visitor.");
          await sdk.set({ visitor_type: "new" });
          localStorage.setItem("hasVisited", "true");
          localStorage.setItem("active_visitor_type", "new");
          sessionStorage.setItem("just_classified_new", "true");
          window.location.reload();
        } else if (justClassifiedNew === "true") {
          // We just reloaded to apply "new" classification. Keep state but do not reload again.
          console.log("[PersonalizeInitializer] First-time classification reload complete.");
          sessionStorage.removeItem("just_classified_new");
          await sdk.set({ visitor_type: "new" });
        } else {
          // Returning visitor classification
          if (activeType !== "returning") {
            console.log("[PersonalizeInitializer] Classifying as returning visitor (transition).");
            await sdk.set({ visitor_type: "returning" });
            localStorage.setItem("active_visitor_type", "returning");
            window.location.reload();
          } else {
            // Already returning, just set attribute in SDK to maintain it
            console.log("[PersonalizeInitializer] Active visitor remains returning.");
            await sdk.set({ visitor_type: "returning" });
          }
        }
      } catch (error) {
        console.error("[PersonalizeInitializer] Failed to classify visitor:", error);
      }
    };

    initializeVisitor();
  }, []);

  return null;
}
