'use client';

import { Checkbox, MultiSelect, Pagination } from '@/components/ui';
import { PetCard } from '@/features/pets/components/PetCard/PetCard';
import {
  Pet,
  PetAge,
  PetGender,
  PetSize,
  PetSpecies,
  PetsSpecialNeeds,
} from '@/features/pets/types';
import clsx from 'clsx';
import { useState } from 'react';
import styles from './styles.module.scss';

const samplePets: Pet[] = [
  {
    id: 1,
    name: 'Каспер',
    species: 1,
    gender: 1,
    size: 2,
    age: 3,
    hasSpecialNeeds: false,
    description:
      'Дружелюбний та активний песик, який любить прогулянки та ігри. Добре ладить з дітьми та іншими тваринами.',
    pictureUrl:
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
  },
  {
    id: 2,
    name: 'Лілі',
    species: 1,
    gender: 1,
    size: 1,
    age: 2,
    hasSpecialNeeds: true,
    description:
      "Ніжна та ласкава собачка, яка любить тепло та затишок. Потребує особливого догляду через проблеми зі здоров'ям.",
    pictureUrl:
      'https://images.unsplash.com/photo-1591160690555-5debfba289f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
  },
  {
    id: 3,
    name: 'Мурчик',
    species: 0,
    gender: 1,
    size: 1,
    age: 1,
    hasSpecialNeeds: false,
    description:
      "Грайливий котик, який обожнює м'які іграшки та сонячні місця. Має доброзичливий характер.",
    pictureUrl:
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2043&q=80',
  },
];

interface Item {
  id: number;
  name: string;
}

export const PetsGrid = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleOption = (option: string) => {
    setSelectedOptions((prev) => {
      if (prev.includes(option)) {
        return prev.filter((item) => item !== option);
      } else {
        return [...prev, option];
      }
    });
  };

  const itemsPerPage = 10;

  const items: Item[] = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    name: `Item ${index + 1}`,
  }));

  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      <div className={clsx('grid', styles.filters)}>
        <div className="col-desktop-1-3 col-tablet-1-3 col-1-2">
          <MultiSelect
            options={Object.values(PetSpecies)}
            placeholder="Вид тваринки"
          />
        </div>
        <div className="col-desktop-4-6 col-tablet-4-6 col-1-2">
          <MultiSelect options={Object.values(PetAge)} placeholder="Вік" />
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
            checked={selectedOptions.includes('showRecommendations')}
            toggleOption={toggleOption}
          />
        </div>
        <div className="col-desktop-1-3 col-tablet-1-3 col-1-2">
          <MultiSelect options={Object.values(PetGender)} placeholder="Стать" />
        </div>
        <div className="col-desktop-4-6 col-tablet-4-6 col-1-2">
          <MultiSelect options={Object.values(PetSize)} placeholder="Розмір" />
        </div>
        <div className="col-desktop-7-9 col-tablet-1-3 col-1-2">
          <MultiSelect
            options={Object.values(PetsSpecialNeeds)}
            placeholder="Особливості"
          />
        </div>
        <div className="col-desktop-10-12 col-tablet-4-6 col-1-2">
          <MultiSelect
            options={Object.values(PetSpecies)}
            placeholder="Сортувати за"
          />
        </div>
      </div>

      <div className={styles.grid}>
        {samplePets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>

      <div className={styles.paginationWrapper}>
        <Pagination
          pageCount={pageCount}
          onPageChange={handlePageChange}
          initialPage={currentPage}
        />
      </div>
    </>
  );
};
