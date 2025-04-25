import { Container } from '@/components/layout';
import { PetsGrid } from '@/features/pets/components/PetsGrid/PetsGrid';
import { HeadingSection } from '@/features/pets/components/PetsPage/sections/HeadingSection';

export default function PetsPage() {
  return (
    <section className="section">
      <Container>
        <HeadingSection />

        <PetsGrid />
      </Container>
    </section>
  );
}
