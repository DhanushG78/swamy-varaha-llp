"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getPersonalizeSdk } from "@/lib/personalize";

export default function PersonalizeInitializer() {
  const pathname = usePathname();

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
        const path = pathname.toLowerCase();
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

        // Always sync current attributes to the SDK to guarantee consistency
        const updatePayload: Record<string, string> = {
          visitor_type: visitorType
        };
        const finalInterest = detectedInterest || storedInterest;
        if (finalInterest) {
          updatePayload.property_interest = finalInterest;
        }

        console.log("[PersonalizeDebug] Synchronizing SDK attributes:", JSON.stringify(updatePayload));
        await sdk.set(updatePayload);
        console.log("[PersonalizeDebug] sdk.set() call complete.");

        // Reload only if the values have actually changed in localStorage
        const visitorTypeChanged = debugActiveType !== visitorType;
        const interestChanged = detectedInterest !== null && detectedInterest !== storedInterest;

        if (visitorTypeChanged || interestChanged) {
          console.log(`[PersonalizeDebug] State change detected (typeChanged: ${visitorTypeChanged}, interestChanged: ${interestChanged}). Triggering reload...`);
          
          localStorage.setItem("debug_active_visitor_type", visitorType);
          if (detectedInterest) {
            localStorage.setItem("property_interest", detectedInterest);
          }
          
          window.location.reload();
        } else {
          console.log("[PersonalizeDebug] Local states match. No reload required.");
        }

        // Diagnostics
        if (typeof sdk.getVariants === "function") {
          console.log("[PersonalizeDebug] sdk.getVariants():", JSON.stringify(sdk.getVariants()));
        } else {
          console.log("[PersonalizeDebug] sdk.getVariants is not a function.");
        }

        if (typeof sdk.getExperiences === "function") {
          console.log("[PersonalizeDebug] sdk.getExperiences():", JSON.stringify(sdk.getExperiences()));
        } else {
          console.log("[PersonalizeDebug] sdk.getExperiences is not a function.");
        }

      } catch (error) {
        console.error("[PersonalizeDebug] Failed to initialize visitor / interest:", error);
      }
    };

    initializeVisitor();
  }, [pathname]);

  return null;
}
