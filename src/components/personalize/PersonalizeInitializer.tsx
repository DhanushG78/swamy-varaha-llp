"use client";

import { useEffect } from "react";
import { getPersonalizeSdk } from "@/lib/personalize";

export default function PersonalizeInitializer() {
  useEffect(() => {
    const initializeVisitor = async () => {
      try {
        console.log("[PersonalizeDebug] Initializing visitor classification...");
        const sdk = await getPersonalizeSdk();
        if (!sdk) {
          console.warn("[PersonalizeDebug] SDK is not initialized.");
          return;
        }

        const visitorType = "returning";
        const debugActiveType = localStorage.getItem("debug_active_visitor_type");

        console.log("[PersonalizeDebug] Forced visitor type:", visitorType);
        console.log("[PersonalizeDebug] Last active visitor type from localStorage:", debugActiveType);

        if (debugActiveType !== visitorType) {
          console.log(`[PersonalizeDebug] Active type mismatch (${debugActiveType} !== ${visitorType}). Calling sdk.set()...`);
          await sdk.set({ visitor_type: visitorType });
          console.log("[PersonalizeDebug] sdk.set() call complete.");
          localStorage.setItem("debug_active_visitor_type", visitorType);
          console.log("[PersonalizeDebug] Triggering reload to apply forced visitor type at edge...");
          window.location.reload();
        } else {
          console.log("[PersonalizeDebug] Active type already matches forced type. Maintaining state.");
          console.log("[PersonalizeDebug] Calling sdk.set()...");
          await sdk.set({ visitor_type: visitorType });
          console.log("[PersonalizeDebug] sdk.set() call complete.");
        }

        // Diagnostics
        if (typeof sdk.getVariants === "function") {
          console.log("[PersonalizeDebug] sdk.getVariants():", sdk.getVariants());
        } else {
          console.log("[PersonalizeDebug] sdk.getVariants is not a function.");
        }

        if (typeof sdk.getExperiences === "function") {
          console.log("[PersonalizeDebug] sdk.getExperiences():", sdk.getExperiences());
        } else {
          console.log("[PersonalizeDebug] sdk.getExperiences is not a function.");
        }

      } catch (error) {
        console.error("[PersonalizeDebug] Failed to classify visitor:", error);
      }
    };

    initializeVisitor();
  }, []);

  return null;
}
