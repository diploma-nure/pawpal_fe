export const PetActivity = {
  0: 'До 1 року',
  1: '1–3 роки',
  2: '3–7 років',
};

export const PetAge = {
  0: 'До 1 року',
  1: '1–3 роки',
  2: '3–7 років',
  3: '7–10 років',
  4: '10+ років',
};

export const PetGender = {
  0: 'Хлопчик',
  1: 'Дівчина',
};

export const PetSize = {
  0: 'Маленький (до 30 см)',
  1: 'Середній (30 - 50 см)',
  2: 'Великий (від 50 см)',
};

export const PetSpecies = {
  0: 'Котик',
  1: 'Песик',
};

export const PlaceofResidence = {
  0: 'Інше',
  1: 'Квартира',
  2: 'Приватний будинок',
};

export const PetsSpecialNeeds = {
  0: 'Без особливостей',
  1: 'З особливостями',
};

export interface Pet {
  id: number;
  name: string;
  species: keyof typeof PetSpecies;
  gender: keyof typeof PetGender;
  size: keyof typeof PetSize;
  age: keyof typeof PetAge;
  hasSpecialNeeds: boolean;
  description: string;
  pictureUrl: string;
}
