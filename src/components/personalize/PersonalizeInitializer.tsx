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
        const sessionSynced = sessionStorage.getItem("personalize_session_synced") === "true";

        console.log("[PersonalizeDebug] Evaluated visitor type:", visitorType);
        console.log("[PersonalizeDebug] Last active visitor type from localStorage:", debugActiveType);
        console.log("[PersonalizeDebug] Evaluated property interest:", detectedInterest);
        console.log("[PersonalizeDebug] Last active property interest from localStorage:", storedInterest);
        console.log("[PersonalizeDebug] Is session synchronized:", sessionSynced);

        const visitorTypeChanged = debugActiveType !== visitorType;
        const interestChanged = detectedInterest !== null && detectedInterest !== storedInterest;

        // 3. Update Personalize SDK & Persist (Step 4, 5, 6, 7)
        if (!sessionSynced || visitorTypeChanged || interestChanged) {
          const updatePayload: Record<string, string> = {};
          
          // If we have a newly detected interest, use it.
          // Otherwise, if we are performing the initial session sync, fallback to the stored interest.
          const finalInterest = detectedInterest || (!sessionSynced ? storedInterest : null);

          updatePayload.visitor_type = visitorType;
          if (finalInterest) {
            updatePayload.property_interest = finalInterest;
          }

          console.log(
            `[PersonalizeDebug] Sync needed (sessionSynced: ${sessionSynced}, typeChanged: ${visitorTypeChanged}, interestChanged: ${interestChanged}). calling sdk.set() with:`,
            updatePayload
          );
          await sdk.set(updatePayload);
          console.log("[PersonalizeDebug] sdk.set() call complete.");

          sessionStorage.setItem("personalize_session_synced", "true");
          localStorage.setItem("debug_active_visitor_type", visitorType);
          if (finalInterest) {
            localStorage.setItem("property_interest", finalInterest);
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
  }, [pathname]);

  return null;
}
