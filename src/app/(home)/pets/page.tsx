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
  specialNeeds: number[];
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
    specialNeeds: [],
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
      HasSpecialNeeds: filters.specialNeeds,
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

  const renderNoPetsMessage = () => {
    if (filters.showRecommendations) {
      return (
        <p className="heading3">
          Наразі немає рекомендованих тваринок для усиновлення.
          <br />
          <br />
          Спробуйте переглянути список усіх тваринок.
        </p>
      );
    }
    return (
      <p className="heading3">
        Жодна тваринка не підходить під ваші фільтри для пошуку.
        <br />
        <br />
        Спробуйте змінити фільтри або переглянути список рекомендованих
        тваринок.
      </p>
    );
  };

  return (
    <Suspense>
      <section className="section">
        <Container>
          <HeadingSection />

          <FilterSection onFiltersChange={handleFiltersChange} />

          {!error && items && <PetsGrid pets={items} />}
          {items?.length === 0 && !error && renderNoPetsMessage()}
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
