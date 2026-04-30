import Hero from "@/sections/Hero";
import FeaturedProperties from "@/sections/FeaturedProperties";
import Categories from "@/sections/Categories";
import ValueProposition from "@/sections/ValueProposition";
import StatsStrip from "@/components/StatsStrip";
import AgentRecruitBanner from "@/sections/AgentRecruitBanner";
import HomeAgents from "@/sections/HomeAgents";
import { getGlobalSettings } from "@/lib/api";

export default async function Home() {
  const settings = await getGlobalSettings();
  const heroVideoUrl: string | undefined = settings?.hero_video_url || undefined;

  return (
    <main>
      {/* 1. Hero — full-bleed video + overlay + search */}
      <Hero videoUrl={heroVideoUrl} />

      {/* 2. Popular Properties — white bg */}
      <FeaturedProperties />

      {/* 3. Feature Categories — light gray bg */}
      <Categories />

      {/* 4. Value Proposition — white bg, 2-col split */}
      <ValueProposition />

      {/* 5. Stats Strip — dark charcoal bg */}
      <StatsStrip />

      {/* 6. Agent Recruitment Banner — accent red */}
      <AgentRecruitBanner />

      {/* 7. Our Agents — white bg */}
      <HomeAgents />
    </main>
  );
}

