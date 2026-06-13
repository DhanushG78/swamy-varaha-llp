import Hero from "@/sections/Hero";
import FeaturedProperties from "@/sections/FeaturedProperties";
import Categories from "@/sections/Categories";
import ValueProposition from "@/sections/ValueProposition";
import CTABanner from "@/sections/CTABanner";
import AchievementSection from "@/sections/AchievementSection";
import { getHomePage } from "@/lib/api";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home(props: { searchParams: Promise<any> }) {
  const searchParams = await props.searchParams;
  const homePage = await getHomePage(searchParams);

  if (!homePage || !homePage.page_sections) {
    return <main className="min-h-screen flex items-center justify-center">No home page data found. Please publish the Home Page entry in Contentstack.</main>;
  }

  return (
    <main>
      {homePage.page_sections.map((section: any, index: number) => {
        if (section.hero_section) {
          return <Hero key={`hero-${index}`} data={section.hero_section} />;
        }
        if (section.categories_section) {
          return <Categories key={`cat-${index}`} data={section.categories_section} />;
        }
        if (section.featured_properties_section) {
          return <FeaturedProperties key={`feat-${index}`} data={section.featured_properties_section} />;
        }
        if (section.achievement_section) {
          return <AchievementSection key={`achiev-${index}`} data={section.achievement_section} />;
        }
        if (section.cta_banner_section) {
          console.log("[CTA Section Debug] Rendering CTA Section with payload:", JSON.stringify(section.cta_banner_section, null, 2));
          const heroSec = homePage.page_sections.find((s: any) => s.hero_section)?.hero_section;
          
          // Determine if the video in the hero payload is actually a Hero video or a CTA video
          let isHeroVideo = false;
          if (heroSec?.background_video) {
            const videoUrl = heroSec.background_video.url || (Array.isArray(heroSec.background_video) ? heroSec.background_video[0]?.url : "") || "";
            const filename = heroSec.background_video.filename || "";
            const strVal = typeof heroSec.background_video === "string" ? heroSec.background_video : "";
            isHeroVideo = videoUrl.toLowerCase().includes("hero") || 
                          filename.toLowerCase().includes("hero") || 
                          strVal.toLowerCase().includes("hero");
          }

          const mergedData = {
            ...section.cta_banner_section,
            cta_heading: heroSec?.cta_heading,
            cta_description: heroSec?.cta_description,
            cta_button_text: heroSec?.cta_button_text,
            cta_button_link: heroSec?.cta_button_link,
            background_video: homePage.cta_background_video || ((heroSec?.cta_heading && !isHeroVideo) ? heroSec?.background_video : undefined)
          };
          return <CTABanner key={`cta-${index}`} data={mergedData} />;
        }
        if (section.value_proposition_section) {
          return <ValueProposition key={`vp-${index}`} data={section.value_proposition_section} />;
        }
        return null;
      })}
    </main>
  );
}
