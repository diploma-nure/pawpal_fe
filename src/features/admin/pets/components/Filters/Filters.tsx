import { Button, Select } from '@/components/ui';
import { FilterValues } from '@/features/admin/pets/types';
import {
  PetAge,
  PetGender,
  PetSize,
  PetSpecies,
  PetsSpecialNeeds,
  SortByOptions,
} from '@/features/pets/types';
import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';
import styles from './styles.module.scss';

type Props = {
  onFiltersChange?: (filters: FilterValues) => void;
};

export const Filters: FC<Props> = ({ onFiltersChange }) => {
  const [filterValues, setFilterValues] = useState<FilterValues>({
    species: [],
    ages: [],
    genders: [],
    sizes: [],
    specialNeeds: null,
    sortBy: null,
  });

  useEffect(() => {
    onFiltersChange?.(filterValues);
  }, [filterValues, onFiltersChange]);

  const handleMultiSelectChange = (
    key: 'species' | 'ages' | 'genders' | 'sizes',
    values: number[],
  ) => {
    setFilterValues((prev) => ({
      ...prev,
      [key]: values,
    }));
  };

  const handleSelectChange = (
    key: 'specialNeeds' | 'sortBy',
    value: number,
  ) => {
    setFilterValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilterValues({
      species: [],
      ages: [],
      genders: [],
      sizes: [],
      specialNeeds: null,
      sortBy: null,
    });
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
            'col-desktop-1-4 col-tablet-1-3 col-1-2',
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
            'col-desktop-5-8 col-tablet-4-6 col-1-2',
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
            'col-desktop-9-12 col-tablet-1-3 col-1-2',
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
            'col-desktop-1-4 col-tablet-4-6 col-1-2',
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
            'col-desktop-5-8 col-tablet-1-3 col-1-2',
            styles.filters__additional,
          )}
        >
          <Select
            options={PetsSpecialNeeds}
            value={filterValues.specialNeeds}
            placeholder="Особливості"
            onChange={(value) =>
              handleSelectChange('specialNeeds', value as number)
            }
          />
        </div>
        <div
          className={clsx(
            'col-desktop-9-12 col-tablet-4-6 col-1-2',
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
