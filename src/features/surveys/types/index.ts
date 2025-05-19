export type Survey = {
  id: number;
  vacationPetCarePlan: string;
  hasOwnnedPetsBefore: boolean;
  understandsResponsibility: boolean;
  hasSufficientFinancialResources: boolean;
  placeOfResidence: number;
  hasSafeWalkingArea: boolean;
  petsAllowedAtResidence: number;
  hasOtherPets: boolean;
  hasSmallChildren: boolean;
  preferredSpecies: number[];
  preferredSizes: number[];
  preferredAges: number[];
  preferredGenders: number[];
  desiredFeaturesIds: number[];
  desiredActivityLevel: number;
  readyForSpecialNeedsPet: boolean;
};
