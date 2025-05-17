'use client';
import { Button, Checkbox, Select } from '@/components/ui';
import {
  PetAge,
  PetGender,
  PetSize,
  PetSpecies,
  PetsSpecialNeeds,
  SortByOptions,
} from '@/features/pets/types';
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import styles from './styles.module.scss';

type Props = {
  species?: string;
  sizes?: string;
  ages?: string;
  genders?: string;
  specialNeeds?: string;
  showRecommendations?: string;
  sortBy?: string;
};

type FilterValues = {
  species: number | null;
  ages: number | null;
  genders: number | null;
  sizes: number | null;
  specialNeeds: number | null;
  sortBy: number | null;
};

export const FilterSection = ({
  species,
  sizes,
  ages,
  genders,
  specialNeeds,
  showRecommendations,
  sortBy,
}: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [checkedOptions, setCheckedOptions] = useState<{
    [key: string]: boolean;
  }>({ showRecommendations: showRecommendations === 'true' });

  const [selectedValues, setSelectedValues] = useState<FilterValues>({
    species: species ? parseInt(species) : null,
    ages: ages ? parseInt(ages) : null,
    genders: genders ? parseInt(genders) : null,
    sizes: sizes ? parseInt(sizes) : null,
    specialNeeds: specialNeeds ? parseInt(specialNeeds) : null,
    sortBy: sortBy ? parseInt(sortBy) : null,
  });

  const updateSearchParam = ({
    key,
    value,
  }: {
    key: string;
    value: number | string;
  }) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value.toString());

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const toggleOption = (option: string, value?: boolean) => {
    setCheckedOptions((prev) => ({
      ...prev,
      [option]: value ?? !prev[option],
    }));

    updateSearchParam({
      key: option,
      value: value ? 'true' : 'false',
    });
  };

  const handleSelectChange = (key: keyof FilterValues, value: number) => {
    setSelectedValues((prev) => ({
      ...prev,
      [key]: value,
    }));

    updateSearchParam({ key, value });
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
    router.push('/pets');
  };

  return (
    <div className={styles.wrapper}>
      <input
        type="checkbox"
        id="filtersToggle"
        className={styles.filters__checkbox}
      />
      <label htmlFor="filtersToggle" className={styles.filters__toggle}></label>

      <div className={clsx('grid', styles.filters)}>
        <div
          className={clsx(
            'col-desktop-1-3 col-tablet-1-3 col-1-2',
            styles.filters__additional,
          )}
        >
          <Select
            value={selectedValues.species}
            options={PetSpecies}
            placeholder="Вид тваринки"
            onChange={(value) => handleSelectChange('species', value)}
          />
        </div>
        <div
          className={clsx(
            'col-desktop-4-6 col-tablet-4-6 col-1-2',
            styles.filters__additional,
          )}
        >
          <Select
            value={selectedValues.ages}
            options={PetAge}
            placeholder="Вік"
            onChange={(value) => handleSelectChange('ages', value)}
          />
        </div>
        <div
          className={clsx(
            'col-desktop-7-9 col-tablet-1-6 col-1-2',
            styles.filters__recommendations,
          )}
        >
          <Checkbox
            content="Показати мої рекомендації за анкетою"
            option="showRecommendations"
            checked={checkedOptions.showRecommendations}
            toggleOption={toggleOption}
          />
          <div className={styles.placeholder} />
        </div>
        <div
          className={clsx(
            'col-desktop-1-3 col-tablet-1-3 col-1-2',
            styles.filters__additional,
          )}
        >
          <Select
            options={PetGender}
            value={selectedValues.genders}
            placeholder="Стать"
            onChange={(value) => handleSelectChange('genders', value)}
          />
        </div>
        <div
          className={clsx(
            'col-desktop-4-6 col-tablet-4-6 col-1-2',
            styles.filters__additional,
          )}
        >
          <Select
            options={PetSize}
            value={selectedValues.sizes}
            placeholder="Розмір"
            onChange={(value) => handleSelectChange('sizes', value)}
          />
        </div>
        <div
          className={clsx(
            'col-desktop-7-9 col-tablet-1-3 col-1-2',
            styles.filters__additional,
          )}
        >
          <Select
            options={PetsSpecialNeeds}
            value={selectedValues.specialNeeds}
            placeholder="Особливості"
            onChange={(value) => handleSelectChange('specialNeeds', value)}
          />
        </div>
        <div
          className={clsx(
            'col-desktop-10-12 col-tablet-4-6 col-1-2',
            styles.filters__additional,
          )}
        >
          <Select
            options={SortByOptions}
            value={selectedValues.sortBy}
            placeholder="Сортувати за"
            onChange={(value) => handleSelectChange('sortBy', value)}
          />
        </div>
        <div
          className={clsx(
            'col-desktop-10-12 col-tablet-4-6 col-1-2',
            styles.filters__additional,
          )}
        >
          <Button
            variant="link"
            className={styles.filters__reset}
            onClick={clearFilters}
          >
            Скинути всі фільтри
          </Button>
        </div>
      </div>
    </div>
  );
};
