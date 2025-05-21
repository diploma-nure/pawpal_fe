export const PetActivity = [
  { title: 'До 1 року', value: 0 },
  { title: '1–3 роки', value: 1 },
  { title: '3–7 років', value: 2 },
];

export const PetAge = [
  { title: 'До 1 року', value: 0 },
  { title: '1–3 роки', value: 1 },
  { title: '3–7 років', value: 2 },
  { title: '7–10 років', value: 3 },
  { title: '10+ років', value: 4 },
];

export const PetGender = [
  { title: 'Хлопчик', value: 0 },
  { title: 'Дівчина', value: 1 },
];

export const PetSize = [
  { title: 'Маленький (до 30 см)', value: 0 },
  { title: 'Середній (30 - 50 см)', value: 1 },
  { title: 'Великий (від 50 см)', value: 2 },
];

export const PetSpecies = [
  { title: 'Котик', value: 0 },
  { title: 'Песик', value: 1 },
];

export const PlaceofResidence = [
  { title: 'Інше', value: 0 },
  { title: 'Квартира', value: 1 },
  { title: 'Приватний будинок', value: 2 },
];

export const PetsSpecialNeeds = [
  { title: 'Без особливостей', value: 0 },
  { title: 'З особливостями', value: 1 },
];

export const SortByOptions = [
  { title: "Ім'я", value: 0 },
  { title: 'Вік', value: 1 },
  { title: 'Нові тваринки', value: 2 },
  { title: 'Розміри', value: 3 },
];

interface PetPicture {
  id: number;
  url: string;
  order: number;
}

export interface Pet {
  id: number;
  name: string;
  species: (typeof PetSpecies)[number]['value'];
  gender: (typeof PetGender)[number]['value'];
  size: (typeof PetSize)[number]['value'];
  age: (typeof PetAge)[number]['value'];
  hasSpecialNeeds: boolean;
  description: string;
  pictures: PetPicture[];
}

export interface PaginatedPet {
  id: number;
  name: string;
  species: (typeof PetSpecies)[number]['value'];
  gender: (typeof PetGender)[number]['value'];
  size: (typeof PetSize)[number]['value'];
  age: (typeof PetAge)[number]['value'];
  hasSpecialNeeds: boolean;
  description: string;
  pictureUrl: string;
}
