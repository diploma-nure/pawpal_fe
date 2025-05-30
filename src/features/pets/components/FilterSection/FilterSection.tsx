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
import { useIsClient } from '@/hooks/useIsClient';
import clsx from 'clsx';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

type Props = {
  onFiltersChange?: (filters: FilterValues) => void;
};

type FilterValues = {
  species: number[];
  ages: number[];
  genders: number[];
  sizes: number[];
  specialNeeds: number[];
  sortBy: number | null;
  showRecommendations: boolean;
};

export const FilterSection = ({ onFiltersChange }: Props) => {
  const token = Cookies.get('token');
  const isClient = useIsClient();
  const [filterValues, setFilterValues] = useState<FilterValues>({
    species: [],
    ages: [],
    genders: [],
    sizes: [],
    specialNeeds: [],
    sortBy: null,
    showRecommendations: false,
  });

  useEffect(() => {
    onFiltersChange?.(filterValues);
  }, [filterValues, onFiltersChange]);

  const handleMultiSelectChange = (
    key: 'species' | 'ages' | 'genders' | 'sizes' | 'specialNeeds',
    values: number[],
  ) => {
    setFilterValues((prev) => ({
      ...prev,
      [key]: values,
    }));
  };

  const handleSelectChange = (key: 'sortBy', value: number) => {
    setFilterValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleShowRecommendations = () => {
    setFilterValues((prev) => ({
      species: [],
      ages: [],
      genders: [],
      sizes: [],
      specialNeeds: [],
      sortBy: null,
      showRecommendations: !prev.showRecommendations,
    }));
  };

  const clearFilters = () => {
    setFilterValues({
      species: [],
      ages: [],
      genders: [],
      sizes: [],
      specialNeeds: [],
      sortBy: null,
      showRecommendations: false,
    });
  };

  return (
    <div className={styles.wrapper}>
      {!filterValues.showRecommendations && (
        <>
          <input
            type="checkbox"
            id="filtersToggle"
            className={styles.filters__checkbox}
          />
          <label
            htmlFor="filtersToggle"
            className={styles.filters__toggle}
          ></label>
        </>
      )}

      <div
        className={clsx(
          'grid',
          clsx(styles.filters, {
            [styles.filters__recommended_only]:
              filterValues.showRecommendations,
          }),
        )}
      >
        <div
          className={clsx(
            'col-desktop-1-3 col-tablet-1-3 col-1-2',
            styles.filters__additional,
          )}
        >
          <Select
            value={filterValues.species}
            options={PetSpecies}
            placeholder="Вид тваринки"
            onChange={(value) =>
              handleMultiSelectChange('species', value as number[])
            }
            multiselect
          />
        </div>
        <div
          className={clsx(
            'col-desktop-4-6 col-tablet-4-6 col-1-2',
            styles.filters__additional,
          )}
        >
          <Select
            value={filterValues.ages}
            options={PetAge}
            placeholder="Вік"
            onChange={(value) =>
              handleMultiSelectChange('ages', value as number[])
            }
            multiselect
          />
        </div>
        <div
          className={clsx(
            {
              'col-desktop-7-9 col-tablet-1-6 ':
                !filterValues.showRecommendations,
              'col-desktop-1-5 col-tablet-1-3':
                filterValues.showRecommendations,
            },
            'col-1-2',
            styles.filters__recommendations,
          )}
          suppressHydrationWarning
        >
          {token && isClient && (
            <Checkbox
              content="Показати мої рекомендації за анкетою"
              option="showRecommendations"
              checked={filterValues.showRecommendations}
              toggleOption={() => toggleShowRecommendations()}
            />
          )}
          <div className={styles.placeholder} suppressHydrationWarning />
        </div>
        <div
          className={clsx(
            'col-desktop-1-3 col-tablet-1-3 col-1-2',
            styles.filters__additional,
          )}
        >
          <Select
            options={PetGender}
            value={filterValues.genders}
            placeholder="Стать"
            onChange={(value) =>
              handleMultiSelectChange('genders', value as number[])
            }
            multiselect
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
            value={filterValues.sizes}
            placeholder="Розмір"
            onChange={(value) =>
              handleMultiSelectChange('sizes', value as number[])
            }
            multiselect
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
            value={filterValues.specialNeeds}
            placeholder="Особливості"
            onChange={(value) =>
              handleMultiSelectChange('specialNeeds', value as number[])
            }
            multiselect
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
            value={filterValues.sortBy}
            placeholder="Сортувати за"
            onChange={(value) => handleSelectChange('sortBy', value as number)}
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
