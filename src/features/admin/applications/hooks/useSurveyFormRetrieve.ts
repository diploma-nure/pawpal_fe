import { SurveyFormSchema } from '@/features/profile/components/SurveyForm';
import { useCheckboxArray } from '@/features/surveys/hooks/useCheckboxArray';
import { useGetSurvey } from '@/features/surveys/hooks/useGetSurvey';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const useSurveyFormRetrive = (userId: number) => {
  const { data } = useGetSurvey({
    userId: userId,
  });

  const specialNeeds = useCheckboxArray([], true);

  const {
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<SurveyFormSchema>({
    defaultValues: {
      petType: [],
      gender: [],
      size: [],
      age: [],
      hasSpecialNeeds: 'false',
      characteristics: [],
      housingType: undefined,
      hasYard: 'false',
      allowPets: '0',
      hasOtherPets: 'false',
      hasChildren: 'false',
      hadPetsBefore: 'false',
      activityLevel: '0',
      willingToAdoptSpecialNeeds: 'false',
      understandsResponsibility: 'false',
      vacationPetCarePlan: '',
      hasSufficientFinancialResources: 'false',
    },
  });

  const petType = watch('petType');
  const gender = watch('gender');
  const size = watch('size');
  const age = watch('age');

  useEffect(() => {
    if (data?.data) {
      const surveyData = data.data;

      if (surveyData.readyForSpecialNeedsPet) {
        specialNeeds.setValues([1]);
      } else {
        specialNeeds.setValues([0]);
      }

      reset({
        petType: surveyData.preferredSpecies,
        gender: surveyData.preferredGenders,
        size: surveyData.preferredSizes,
        age: surveyData.preferredAges,
        hasSpecialNeeds: surveyData.readyForSpecialNeedsPet ? 'true' : 'false',
        characteristics: surveyData.desiredFeaturesIds,

        housingType: surveyData.placeOfResidence.toString() as '1' | '2',
        hasYard: surveyData.hasSafeWalkingArea ? 'true' : 'false',
        allowPets: surveyData.petsAllowedAtResidence.toString() as
          | '0'
          | '1'
          | '2',
        hasOtherPets: surveyData.hasOtherPets ? 'true' : 'false',
        hasChildren: surveyData.hasSmallChildren ? 'true' : 'false',

        hadPetsBefore: surveyData.hasOwnnedPetsBefore ? 'true' : 'false',
        activityLevel: surveyData.desiredActivityLevel.toString() as
          | '0'
          | '1'
          | '2',
        willingToAdoptSpecialNeeds: surveyData.readyForSpecialNeedsPet
          ? 'true'
          : 'false',

        understandsResponsibility: surveyData.understandsResponsibility
          ? 'true'
          : 'false',
        vacationPetCarePlan: surveyData.vacationPetCarePlan || '',
        hasSufficientFinancialResources:
          surveyData.hasSufficientFinancialResources ? 'true' : 'false',
      });
    }
  }, [data, reset, userId]);

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
