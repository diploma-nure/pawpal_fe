import { Container } from '@/components/layout';
import { Navigation } from '@/features/profile/components/Navigation';
import { ComponentByTab, ProfileTab } from '@/features/profile/constants/tabs';
import { redirect } from 'next/navigation';
import styles from './page.module.scss';

export default async function TabPage({
  params,
}: {
  params: Promise<{ tab?: ProfileTab }>;
}) {
  const { tab } = await params;

  if (!tab || !Object.values(ProfileTab).includes(tab as ProfileTab)) {
    redirect(`/profile/${ProfileTab.Contacts}`);
    // return null;
  }

  const TabComponent = ComponentByTab[tab];

  return (
    <Container>
      <div className={styles.flex}>
        <Navigation />

        <TabComponent />
      </div>
    </Container>
  );
}
