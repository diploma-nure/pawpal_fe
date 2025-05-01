import { ContactForm } from '@/features/profile/components/ContactForm';
import { LikedSection } from '@/features/profile/components/LikedSection/LikedSection';
import { RequestsSection } from '@/features/profile/components/RequestsSection/RequestsSection';
import { SurveyForm } from '@/features/profile/components/SurveyForm';
import { FC } from 'react';

export enum ProfileTab {
  Contacts = 'contacts',
  Liked = 'liked',
  Surveys = 'surveys',
  Requests = 'requests',
}

export const RequestStatus = {
  0: 'Запрошення на зустріч',
  1: 'Призначена відеозустріч',
  2: 'Очікує на розгляд',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ComponentByTab: Record<ProfileTab, FC<any>> = {
  [ProfileTab.Contacts]: ContactForm,
  [ProfileTab.Liked]: LikedSection,
  [ProfileTab.Requests]: RequestsSection,
  [ProfileTab.Surveys]: SurveyForm,
};
