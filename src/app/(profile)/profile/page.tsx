import { ProfileTab } from '@/features/profile/constants/tabs';
import { redirect } from 'next/navigation';

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ tab?: ProfileTab }>;
}) {
  const { tab } = await params;

  if (!tab || !Object.values(ProfileTab).includes(tab as ProfileTab)) {
    redirect(`/profile/${ProfileTab.Contacts}`);
    return null;
  }
}
