import Hero from "@/sections/Hero";
import FeaturedProperties from "@/sections/FeaturedProperties";
import Categories from "@/sections/Categories";
import ValueProposition from "@/sections/ValueProposition";
import CTABanner from "@/sections/CTABanner";
import AchievementSection from "@/sections/AchievementSection";
import { getHomePage } from "@/lib/api";
import PersonalizeDebugPanel from "@/components/personalize/PersonalizeDebugPanel";

export const dynamic = "force-dynamic";

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
          return (
            <div key={`hero-container-${index}`}>
              <Hero data={section.hero_section} />
              <PersonalizeDebugPanel heroHeading={section.hero_section.heading} />
            </div>
          );
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
          return <CTABanner key={`cta-${index}`} data={section.cta_banner_section} />;
        }
        if (section.value_proposition_section) {
          return <ValueProposition key={`vp-${index}`} data={section.value_proposition_section} />;
        }
        return null;
      })}
    </main>
  );
}
