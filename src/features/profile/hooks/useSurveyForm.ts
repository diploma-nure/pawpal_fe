import {
  SurveyFormSchema,
  surveySchema,
} from '@/features/profile/components/SurveyForm';
import { useGetUser } from '@/features/profile/hooks/useGetUser';
import { useCheckboxArray } from '@/features/surveys/hooks/useCheckboxArray';
import { useCompleteSurvey } from '@/features/surveys/hooks/useCompleteSurvey';
import { useGetSurvey } from '@/features/surveys/hooks/useGetSurvey';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const useSurveyForm = (onOpen: () => void) => {
  const user = useGetUser();
  const { data } = useGetSurvey({
    userId: user?.id ? parseInt(user?.id) : 0,
  });
  const { mutate } = useCompleteSurvey({
    config: {
      onSuccess: onOpen,
    },
  });

  const specialNeeds = useCheckboxArray([], true);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
    watch,
  } = useForm<SurveyFormSchema>({
    resolver: zodResolver(surveySchema),
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
  }, [data, reset, user?.id]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      mutate({
        survey: {
          preferredSpecies: data.petType,
          preferredSizes: data.size,
          preferredAges: data.age,
          preferredGenders: data.gender,
          desiredFeaturesIds: data.characteristics as number[],

          hasOtherPets: data.hasOtherPets === 'true',
          hasSafeWalkingArea: data.hasYard === 'true',
          hasSmallChildren: data.hasChildren === 'true',
          petsAllowedAtResidence: Number(data.allowPets),
          placeOfResidence: Number(data.housingType),

          hasOwnnedPetsBefore: data.hadPetsBefore === 'true',
          desiredActivityLevel: Number(data.activityLevel),
          readyForSpecialNeedsPet:
            data.willingToAdoptSpecialNeeds === 'true' &&
            specialNeeds.values.includes(1),

          understandsResponsibility: data.understandsResponsibility === 'true',
          vacationPetCarePlan: data.vacationPetCarePlan || '',
          hasSufficientFinancialResources:
            data.hasSufficientFinancialResources === 'true',
        },
      });
    } catch (e) {
      console.error(e);
    }
  });

  return {
    data,
    petType,
    gender,
    size,
    age,
    specialNeeds,
    control,
    onSubmit,
    errors,
    isDirty,
  };
};
