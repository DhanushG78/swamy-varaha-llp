import Hero from "@/sections/Hero";
import FeaturedProperties from "@/sections/FeaturedProperties";
import Categories from "@/sections/Categories";
import ValueProposition from "@/sections/ValueProposition";
import StatsStrip from "@/components/StatsStrip";
import AgentRecruitBanner from "@/sections/AgentRecruitBanner";
import HomeAgents from "@/sections/HomeAgents";

export default function Home() {
  return (
    <main>
      {/* 1. Hero — full-bleed photo + overlay + search */}
      <Hero />

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
