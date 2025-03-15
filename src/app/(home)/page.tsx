import { HeroSection } from '@/features/home/components/sections/HeroSection/HeroSection';
import { MapSection } from '@/features/home/components/sections/MapSection/MapSection';
import { RatingSection } from '@/features/home/components/sections/RatingSection/RatingSection';
import { ReviewsSection } from '@/features/home/components/sections/ReviewsSection/ReviewsSection';
import { StepsSection } from '@/features/home/components/sections/StepsSection/StepsSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <RatingSection />
      <StepsSection />
      <ReviewsSection />
      <MapSection />
    </>
  );
}
