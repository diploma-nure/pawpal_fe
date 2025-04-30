import { ContactForm } from '@/features/profile/components/ContactForm';
import { LikedSection } from '@/features/profile/components/LikedSection/LikedSection';
import { SurveyForm } from '@/features/profile/components/SurveyForm';
import { FC } from 'react';

export enum ProfileTab {
  Contacts = 'contacts',
  Liked = 'liked',
  Surveys = 'surveys',
  Requests = 'requests',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ComponentByTab: Record<ProfileTab, FC<any>> = {
  [ProfileTab.Contacts]: ContactForm,
  [ProfileTab.Liked]: LikedSection,
  [ProfileTab.Requests]: ContactForm,
  [ProfileTab.Surveys]: SurveyForm,
};
