import { Container } from '@/components/layout';
import { PetsGrid } from '@/features/pets/components/PetsGrid/PetsGrid';
import { HeadingSection } from '@/features/pets/components/PetsPage/sections/HeadingSection';

export const PetsListPage = () => {
  return (
    <Container>
      <HeadingSection />

      <PetsGrid />
    </Container>
  );
};
