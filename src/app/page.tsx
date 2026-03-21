import { HeroSlider } from "@/components/home/HeroSlider";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { BestSellers } from "@/components/home/BestSellers";
import { BrandStory } from "@/components/home/BrandStory";
import { Testimonials } from "@/components/home/Testimonials";
import { Newsletter } from "@/components/home/Newsletter";
import { StorefrontShell } from "@/components/StoreLayout";

export default function HomePage() {
  return (
    <StorefrontShell>
      <HeroSlider />
      <FeaturedCollections />
      <BestSellers />
      <BrandStory />
      <Testimonials />
      <Newsletter />
    </StorefrontShell>
  );
}
