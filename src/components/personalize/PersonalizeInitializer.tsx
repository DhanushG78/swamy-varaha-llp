"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getPersonalizeSdk } from "@/lib/personalize";

export default function PersonalizeInitializer() {
  const pathname = usePathname();

  useEffect(() => {
    const initializeVisitor = async () => {
      try {
        if (typeof window !== "undefined" && window.location.search.includes("clear=true")) {
          localStorage.clear();
          document.cookie.split(";").forEach((c) => {
            document.cookie = c
              .replace(/^ +/, "")
              .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
          });
        }

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
        // NOTE: The Contentstack Personalize audience rule for "Beachfront Buyers" is configured
        // to check for property_interest String equals "beach" (not "beachfront").
        // We map "beachfront" path detection to "beach" to align with this rule.
        let detectedInterest: "beach" | "villa" | "ultraluxury" | null = null;
        const path = pathname.toLowerCase();
        if (path.includes("beachfront")) {
          detectedInterest = "beach";
        } else if (path.includes("villa")) {
          detectedInterest = "villa";
        } else if (path.includes("ultraluxury")) {
          detectedInterest = "ultraluxury";
        }

        const storedInterest = localStorage.getItem("property_interest");

        // Always sync current attributes to the SDK to guarantee consistency
        const updatePayload: Record<string, string> = {
          visitor_type: visitorType
        };
        const finalInterest = detectedInterest || storedInterest;
        if (finalInterest) {
          updatePayload.property_interest = finalInterest;
        }

        await sdk.set(updatePayload);

        // Reload only if the values have actually changed in localStorage
        const visitorTypeChanged = debugActiveType !== visitorType;
        const interestChanged = detectedInterest !== null && detectedInterest !== storedInterest;

        if (visitorTypeChanged || interestChanged) {
          localStorage.setItem("debug_active_visitor_type", visitorType);
          if (detectedInterest) {
            localStorage.setItem("property_interest", detectedInterest);
          }
          
          window.location.reload();
        }

      } catch (error) {
        console.error("[PersonalizeDebug] Failed to initialize visitor / interest:", error);
      }
    };

    initializeVisitor();
  }, [pathname]);

  return null;
}
