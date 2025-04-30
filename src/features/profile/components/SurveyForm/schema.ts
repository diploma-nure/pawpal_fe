import { z } from 'zod';

// Define the schema for the survey form
export const surveySchema = z.object({
  // Living conditions section
  homeType: z.string().min(1, 'Виберіть тип житла'),
  hasSafePlace: z.boolean(),
  petsAllowed: z.boolean().nullable(),
  hasOtherPets: z.boolean(),
  hasChildren: z.boolean(),

  // Experience and expectations section
  hadPetsBefore: z.boolean(),
  activityLevel: z.string().min(1, 'Виберіть рівень активності'),

  // Pet details section
  petType: z.string().min(1, 'Виберіть тип тварини'),
  petSize: z.number().nullable(),
  petAge: z.number().nullable(),
  petGender: z.string().min(1, 'Виберіть стать тварини'),
  petWithSpecialNeeds: z.boolean(),
  petCharacteristics: z.number().nullable(),

  // Responsibility section
  responsibilityAgreement: z.boolean(),
  emergencyPlanDescription: z
    .string()
    .min(10, 'Будь ласка, опишіть ваш план детальніше'),
  canProvideFinancialSupport: z.boolean(),
});

// Export the type for use with React Hook Form
export type SurveyFormSchema = z.infer<typeof surveySchema>;
