import { Container } from '@/components/layout';
import { Pagination } from '@/components/ui';
import { getFilteredPets } from '@/features/pets/api/getFilteredPets';
import { FilterSection } from '@/features/pets/components/FilterSection/FilterSection';
import { HeadingSection } from '@/features/pets/components/HeadingSection';
import { PetsGrid } from '@/features/pets/components/PetsGrid/PetsGrid';
import styles from './page.module.scss';

type PetsPageProps = {
  searchParams: Promise<{
    page?: string;
    species?: string;
    sizes?: string;
    ages?: string;
    genders?: string;
    type?: string;
    specialNeeds?: string;
    showRecommendations?: string;
    sortBy?: string;
  }>;
};

export default async function PetsPage({ searchParams }: PetsPageProps) {
  const {
    page,
    ages,
    genders,
    species,
    sizes,
    sortBy,
    specialNeeds,
    showRecommendations,
  } = await searchParams;

  const {
    data: { items, count },
  } = await getFilteredPets({
    Species: species,
    Sizes: sizes,
    Ages: ages,
    Genders: genders,
    Page: page,
    SortBy: sortBy,
  });

  const totalPages = Math.ceil(count / 10);

  return (
    <section className="section">
      <Container>
        <HeadingSection />

        <FilterSection
          species={species}
          sizes={sizes}
          ages={ages}
          genders={genders}
          specialNeeds={specialNeeds}
          showRecommendations={showRecommendations}
          sortBy={sortBy}
        />

        <PetsGrid page={Number(page)} pets={items} />

        {totalPages > 1 && (
          <div className={styles.paginationWrapper}>
            <Pagination
              pageCount={totalPages}
              page={Number(page)}
              href="/pets"
            />
          </div>
        )}
      </Container>
    </section>
  );
}
