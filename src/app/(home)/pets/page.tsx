'use client';

import { Container } from '@/components/layout';
import { Pagination } from '@/components/ui';
import { usePets } from '@/features/pets/api/getPets';
import { ErrorText } from '@/features/pets/components/ErrorText/ErrorText';
import { FilterSection } from '@/features/pets/components/FilterSection/FilterSection';
import { HeadingSection } from '@/features/pets/components/HeadingSection';
import { PetsGrid } from '@/features/pets/components/PetsGrid/PetsGrid';
import Cookies from 'js-cookie';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import styles from './page.module.scss';

type FilterValues = {
  species: number[];
  ages: number[];
  genders: number[];
  sizes: number[];
  specialNeeds: number | null;
  sortBy: number | null;
  showRecommendations: boolean;
};

export default function PetsPage() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ?? '1';

  const [filters, setFilters] = useState<FilterValues>({
    species: [],
    ages: [],
    genders: [],
    sizes: [],
    specialNeeds: null,
    sortBy: null,
    showRecommendations: false,
  });

  const { data, error } = usePets({
    payload: {
      Page: page,
      Ages: filters.ages,
      Genders: filters.genders,
      Species: filters.species,
      Sizes: filters.sizes,
      SortBy: filters.sortBy?.toString(),
      ShowRecommended: filters.showRecommendations,
      token: Cookies.get('token'),
    },
  });

  const items = data?.data.items;
  const count = data?.data.count;

  const totalPages = count ? Math.ceil(count / 10) : 0;

  const handleFiltersChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };

  return (
    <Suspense>
      <section className="section">
        <Container>
          <HeadingSection />

          <FilterSection onFiltersChange={handleFiltersChange} />

          {!error && <PetsGrid pets={items} />}

          {error && <ErrorText text={error as unknown as string} />}

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
    </Suspense>
  );
}
