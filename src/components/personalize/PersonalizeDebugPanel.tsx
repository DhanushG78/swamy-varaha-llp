"use client";

import { useEffect, useState } from "react";
import { getPersonalizeSdk } from "@/lib/personalize";

export default function PersonalizeDebugPanel({ heroHeading }: { heroHeading: string }) {
  const [variants, setVariants] = useState<any>(null);
  const [experiences, setExperiences] = useState<any>(null);
  const [sdkActive, setSdkActive] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSdkState = async () => {
      try {
        const sdk = await getPersonalizeSdk();
        if (sdk) {
          setSdkActive(true);
          if (typeof sdk.getVariants === "function") {
            setVariants(sdk.getVariants());
          }
          if (typeof sdk.getExperiences === "function") {
            setExperiences(sdk.getExperiences());
          }
        } else {
          setError("SDK returned null");
        }
      } catch (err: any) {
        setError(err.message || "Failed to initialize SDK");
      }
    };

    fetchSdkState();
  }, []);

  return (
    <div style={{ backgroundColor: "#fef9c3", borderColor: "#fde047", borderWidth: 1, borderStyle: "solid", padding: "1rem", margin: "1rem auto", maxWidth: "1200px", fontFamily: "monospace", fontSize: "0.8rem", color: "#854d0e" }}>
      <p style={{ fontWeight: "bold", margin: "0 0 0.5rem 0" }}>⚠️ [PERSONALIZE RUNTIME DEBUG PANEL]</p>
      <div style={{ display: "grid", gridTemplateColumns: "150px 1fr", rowGap: "0.25rem" }}>
        <span>Current Hero Heading:</span>
        <strong style={{ color: "#1e3a8a" }}>"{heroHeading}"</strong>

        <span>SDK Status:</span>
        <span>{sdkActive ? "✅ Active / Initialized" : error ? `❌ Error: ${error}` : "⏳ Initializing..."}</span>

        <span>Active Variants:</span>
        <span>{variants ? JSON.stringify(variants, null, 2) : "None or not resolved yet"}</span>

        <span>Active Experiences:</span>
        <span>{experiences ? JSON.stringify(experiences, null, 2) : "None or not resolved yet"}</span>
      </div>
    </div>
  );
}
