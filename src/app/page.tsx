import { HeroSlider } from "@/components/home/HeroSlider";
import { BrandStory } from "@/components/home/BrandStory";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { SignaturePerfumes } from "@/components/home/SignaturePerfumes";
import { EditorialBlock } from "@/components/home/EditorialBlock";
import { StorefrontShell } from "@/components/StoreLayout";

export default function HomePage() {
  return (
    <StorefrontShell>
      <HeroSlider />
      <BrandStory />
      <FeaturedCollections />
      <EditorialBlock />
      <SignaturePerfumes />
    </StorefrontShell>
  );
}
