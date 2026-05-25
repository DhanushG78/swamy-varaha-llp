"use client";

import { useEffect } from "react";
import { getPersonalizeSdk } from "@/lib/personalize";

export default function PersonalizeInitializer() {
  useEffect(() => {
    const initializeVisitor = async () => {
      try {
        console.log("[PersonalizeDebug] Initializing visitor classification and interest detection...");
        const sdk = await getPersonalizeSdk();
        if (!sdk) {
          console.warn("[PersonalizeDebug] SDK is not initialized.");
          return;
        }

        // 1. Visitor Type Logic
        const hasVisited = localStorage.getItem("hasVisited");
        let visitorType: "new" | "returning" = "returning";

        if (hasVisited === null) {
          visitorType = "new";
          localStorage.setItem("hasVisited", "pending_returning");
        } else if (hasVisited === "pending_returning") {
          visitorType = "new";
          localStorage.setItem("hasVisited", "true");
        } else {
          visitorType = "returning";
        }

        const debugActiveType = localStorage.getItem("debug_active_visitor_type");

        // 2. Behavioral Interest Detection Logic (Step 2 & 3)
        let detectedInterest: "beachfront" | "villa" | "ultraluxury" | null = null;
        const path = window.location.pathname.toLowerCase();
        if (path.includes("beachfront")) {
          detectedInterest = "beachfront";
        } else if (path.includes("villa")) {
          detectedInterest = "villa";
        } else if (path.includes("ultraluxury")) {
          detectedInterest = "ultraluxury";
        }

        const storedInterest = localStorage.getItem("property_interest");

        console.log("[PersonalizeDebug] Evaluated visitor type:", visitorType);
        console.log("[PersonalizeDebug] Last active visitor type from localStorage:", debugActiveType);
        console.log("[PersonalizeDebug] Evaluated property interest:", detectedInterest);
        console.log("[PersonalizeDebug] Last active property interest from localStorage:", storedInterest);

        const visitorTypeChanged = debugActiveType !== visitorType;
        const interestChanged = detectedInterest !== null && detectedInterest !== storedInterest;

        // 3. Update Personalize SDK & Persist (Step 4, 5, 6, 7)
        if (visitorTypeChanged || interestChanged) {
          const updatePayload: Record<string, string> = {};
          if (visitorTypeChanged) {
            updatePayload.visitor_type = visitorType;
          }
          if (interestChanged && detectedInterest) {
            updatePayload.property_interest = detectedInterest;
          }

          console.log(`[PersonalizeDebug] Mismatch detected. Calling sdk.set() with:`, updatePayload);
          await sdk.set(updatePayload);
          console.log("[PersonalizeDebug] sdk.set() call complete.");

          if (visitorTypeChanged) {
            localStorage.setItem("debug_active_visitor_type", visitorType);
          }
          if (interestChanged && detectedInterest) {
            localStorage.setItem("property_interest", detectedInterest);
          }

          console.log("[PersonalizeDebug] Triggering reload to apply updated state...");
          window.location.reload();
        } else {
          console.log("[PersonalizeDebug] Visitor type and property interest already match. Skipping sdk.set().");
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
        console.error("[PersonalizeDebug] Failed to initialize visitor / interest:", error);
      }
    };

    initializeVisitor();
  }, []);

  return null;
}
