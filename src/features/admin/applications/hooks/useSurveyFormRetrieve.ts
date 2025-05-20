import { useCheckboxArray } from '@/features/surveys/hooks/useCheckboxArray';
import { useGetSurvey } from '@/features/surveys/hooks/useGetSurvey';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const useSurveyFormRetrive = (userId: number) => {
  const { data } = useGetSurvey({
    userId: userId,
  });

  const petType = useCheckboxArray();
  const gender = useCheckboxArray();
  const size = useCheckboxArray();
  const age = useCheckboxArray();
  const specialNeeds = useCheckboxArray([], true);

  const {
    control,
    reset,
    formState: { errors },
  } = useForm<SurveyFormInputs>({
    defaultValues: {
      petType: [],
      gender: [],
      size: [],
      age: undefined,
      hasSpecialNeeds: false,
      characteristics: [],
      housingType: undefined,
      hasYard: false,
      allowPets: 0,
      hasOtherPets: false,
      hasChildren: false,
      hadPetsBefore: false,
      activityLevel: 0,
      willingToAdoptSpecialNeeds: false,
      understandsResponsibility: false,
      vacationPetCarePlan: '',
      hasSufficientFinancialResources: false,
    },
  });

  useEffect(() => {
    if (data?.data) {
      const surveyData = data.data;

      if (surveyData.preferredSpecies?.length) {
        petType.setValues(surveyData.preferredSpecies);
      }

      if (surveyData.preferredGenders?.length) {
        gender.setValues(surveyData.preferredGenders);
      }

      if (surveyData.preferredSizes?.length) {
        size.setValues(surveyData.preferredSizes);
      }

      if (surveyData.preferredAges?.length) {
        age.setValues(surveyData.preferredAges);
      }

      if (surveyData.readyForSpecialNeedsPet) {
        specialNeeds.setValues([1]);
      } else {
        specialNeeds.setValues([0]);
      }

      reset({
        petType: surveyData.preferredSpecies?.length
          ? surveyData.preferredSpecies
          : undefined,
        gender: surveyData.preferredGenders?.length
          ? surveyData.preferredGenders
          : undefined,
        size:
          surveyData.preferredSizes && surveyData.preferredSizes.length > 0
            ? surveyData.preferredSizes
            : undefined,
        age: surveyData.preferredAges?.length
          ? surveyData.preferredAges[0]
          : undefined,
        hasSpecialNeeds: Boolean(surveyData.readyForSpecialNeedsPet),
        characteristics: surveyData.desiredFeaturesIds || undefined,

        housingType:
          surveyData.placeOfResidence !== undefined
            ? (String(surveyData.placeOfResidence) as '1' | '2')
            : undefined,
        hasYard: surveyData.hasSafeWalkingArea ?? false,
        allowPets: surveyData.petsAllowedAtResidence ?? 0,
        hasOtherPets: surveyData.hasOtherPets ?? false,
        hasChildren: surveyData.hasSmallChildren ?? false,

        hadPetsBefore: surveyData.hasOwnnedPetsBefore ?? false,
        activityLevel: surveyData.desiredActivityLevel ?? 0,
        willingToAdoptSpecialNeeds: surveyData.readyForSpecialNeedsPet ?? false,

        understandsResponsibility:
          surveyData.understandsResponsibility ?? false,
        vacationPetCarePlan: surveyData.vacationPetCarePlan || '',
        hasSufficientFinancialResources:
          surveyData.hasSufficientFinancialResources ?? false,
      });
    }
  }, [data, reset]);

  return {
    data,
    petType,
    gender,
    size,
    age,
    specialNeeds,
    control,
    errors,
  };
};

// Type for form inputs
export type SurveyFormInputs = {
  petType?: number[];
  gender?: number[];
  size?: number[];
  age?: number;
  hasSpecialNeeds?: boolean;
  characteristics?: number[];
  housingType?: '1' | '2';
  hasYard?: boolean;
  allowPets?: number; // changed to number to match petsAllowedAtResidence
  hasOtherPets?: boolean;
  hasChildren?: boolean;
  hadPetsBefore?: boolean;
  activityLevel?: number;
  willingToAdoptSpecialNeeds?: boolean;
  understandsResponsibility?: boolean;
  vacationPetCarePlan?: string;
  hasSufficientFinancialResources?: boolean;
};
