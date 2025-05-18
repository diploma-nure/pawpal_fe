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
import styles from './page.module.scss';

export default function PetsPage({}) {
  const searchParams = useSearchParams();

  const options = {
    page: searchParams.get('page') ?? undefined,
    ages: searchParams.get('ages') ?? undefined,
    genders: searchParams.get('genders') ?? undefined,
    species: searchParams.get('species') ?? undefined,
    sizes: searchParams.get('sizes') ?? undefined,
    sortBy: searchParams.get('sortBy') ?? undefined,
    specialNeeds: searchParams.get('specialNeeds') ?? undefined,
    showRecommendations: searchParams.get('showRecommendations') ?? undefined,
    token: Cookies.get('token'),
  };

  const { data, error } = usePets({
    payload: {
      Page: options.page,
      Ages: options.ages,
      Genders: options.genders,
      Species: options.species,
      Sizes: options.sizes,
      SortBy: options.sortBy,
      ShowRecommended: options.showRecommendations === 'true',
      token: options.token,
    },
  });

  const items = data?.data.items;
  const count = data?.data.count;

  const totalPages = count ? Math.ceil(count / 10) : 0;

  return (
    <section className="section">
      <Container>
        <HeadingSection />

        <FilterSection
          species={options.species}
          sizes={options.sizes}
          ages={options.ages}
          genders={options.genders}
          specialNeeds={options.specialNeeds}
          showRecommendations={options.showRecommendations}
          sortBy={options.sortBy}
        />

        {!error && <PetsGrid pets={items} />}

        {error && <ErrorText text={error as unknown as string} />}

        {totalPages > 1 && (
          <div className={styles.paginationWrapper}>
            <Pagination
              pageCount={totalPages}
              page={Number(options.page)}
              href="/pets"
            />
          </div>
        )}
      </Container>
    </section>
  );
}
