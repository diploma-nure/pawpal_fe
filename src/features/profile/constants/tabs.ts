import { ContactForm } from '@/features/profile/components/ContactForm';
import { FC } from 'react';

export enum ProfileTab {
  Contacts = 'contacts',
  Liked = 'liked',
  Surveys = 'surveys',
  Requests = 'requests',
}

export const ComponentByTab: Record<ProfileTab, FC> = {
  [ProfileTab.Contacts]: ContactForm,
  [ProfileTab.Liked]: ContactForm,
  [ProfileTab.Requests]: ContactForm,
  [ProfileTab.Surveys]: ContactForm,
};
