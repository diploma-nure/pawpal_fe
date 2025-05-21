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
import { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  selectedValues: FilterValues;
  handleSelectChange(key: keyof FilterValues, value: number): void;
  clearFilters(): void;
};

export const Filters: FC<Props> = ({
  selectedValues: { species, ages, genders, specialNeeds, sortBy, sizes },
  handleSelectChange,
  clearFilters,
}) => {
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
            value={species}
            options={PetSpecies}
            placeholder="Вид тваринки"
            onChange={(value) => handleSelectChange('species', value as number)}
          />
        </div>
        <div
          className={clsx(
            'col-desktop-5-8 col-tablet-4-6 col-1-2',
            styles.filters__additional,
          )}
        >
          <Select
            value={ages}
            options={PetAge}
            placeholder="Вік"
            onChange={(value) => handleSelectChange('ages', value as number)}
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
            value={genders}
            placeholder="Стать"
            onChange={(value) => handleSelectChange('genders', value as number)}
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
            value={sizes}
            placeholder="Розмір"
            onChange={(value) => handleSelectChange('sizes', value as number)}
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
            value={specialNeeds}
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
            value={sortBy}
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
