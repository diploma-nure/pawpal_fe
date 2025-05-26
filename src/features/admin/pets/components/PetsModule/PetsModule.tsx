'use client';

import { Pagination } from '@/components/ui';
import { Filters } from '@/features/admin/pets/components/Filters';
import { PetList } from '@/features/admin/pets/components/PetList/PetList';
import { FilterValues } from '@/features/admin/pets/types';
import { useFilteredPets } from '@/features/pets/api/getFilteredPets';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { AddPet } from '../AddPet/AddPet';
import styles from './styles.module.scss';

export function PetsModule() {
  const params = useSearchParams();
  const page = params.get('page');
  const [filters, setFilters] = useState<FilterValues>({
    species: [],
    ages: [],
    genders: [],
    sizes: [],
    specialNeeds: null,
    sortBy: null,
  });
  const handleFiltersChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };

  const { data } = useFilteredPets({
    payload: {
      Ages: filters.ages,
      Genders: filters.genders,
      Species: filters.species,
      Sizes: filters.sizes,
      SortBy: filters.sortBy?.toString(),
      Page: page ? page : '1',
    },
  });

  const totalPages = data?.data?.count ? Math.ceil(data.data.count / 10) : 0;

  return (
    <>
      <div className={styles.titleWrapper}>
        <h2 className="heading2">Наші хвостики</h2>
        <AddPet />
      </div>

      <div className={styles.filtersWrapper}>
        <Filters onFiltersChange={handleFiltersChange} />
      </div>

      <PetList pets={data?.data.items ?? []} />

      {totalPages > 1 && (
        <div className={styles.paginationWrapper}>
          <Pagination
            pageCount={totalPages}
            page={page ? Number(page) : 1}
            href="/admin/pets"
          />
        </div>
      )}
    </>
  );
}
