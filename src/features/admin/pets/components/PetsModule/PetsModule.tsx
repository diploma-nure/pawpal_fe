'use client';

import { Pagination } from '@/components/ui';
import { safeStringify } from '@/features/admin/helpers/getDefaultValue';
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

  const [selectedValues, setSelectedValues] = useState<FilterValues>({
    species: null,
    ages: null,
    genders: null,
    sizes: null,
    specialNeeds: null,
    sortBy: null,
  });

  const handleSelectChange = (key: keyof FilterValues, value: number) => {
    setSelectedValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setSelectedValues({
      species: null,
      ages: null,
      genders: null,
      sizes: null,
      specialNeeds: null,
      sortBy: null,
    });
  };

  const { data } = useFilteredPets({
    payload: {
      Ages: safeStringify(selectedValues.ages),
      Genders: safeStringify(selectedValues.genders),
      Sizes: safeStringify(selectedValues.sizes),
      Species: safeStringify(selectedValues.species),
      SortBy: safeStringify(selectedValues.sortBy),
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

      <Filters
        selectedValues={selectedValues}
        handleSelectChange={handleSelectChange}
        clearFilters={clearFilters}
      />

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
