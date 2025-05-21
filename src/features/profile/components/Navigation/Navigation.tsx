'use client';

import PlaceholderAvatar from '@/assets/images/PlaceholderAvatar.jpg';
import { Button, Icon } from '@/components/ui';
import { useGetUsersInfo } from '@/features/profile/api/getUsersInfo';
import { NavLink } from '@/features/profile/components/NavLink';
import { ProfileTab } from '@/features/profile/constants/tabs';
import { useGetUser } from '@/features/profile/hooks';
import Cookies from 'js-cookie';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './styles.module.scss';

export const Navigation = () => {
  const user = useGetUser();
  const { push } = useRouter();

  const { data } = useGetUsersInfo({
    payload: {
      id: user?.id as unknown as number,
    },
  });

  const handleLogout = () => {
    Cookies.remove('token');
    localStorage.clear();
    signOut();
    push('/');
  };

  return (
    <div className={styles.navigation}>
      <div className={styles.avatar}>
        <Image
          className={styles.avatar__image}
          src={data?.data.profilePictureUrl ?? PlaceholderAvatar}
          width={64}
          height={64}
          alt={`avatar-${data?.data?.fullName}`}
        />

        <p className={styles.avatar__name}>{data?.data?.fullName}</p>
      </div>

      <div className={styles.linkList}>
        <NavLink href={'/profile/' + ProfileTab.Contacts}>
          Контактна інформація
        </NavLink>

        <NavLink href={'/profile/' + ProfileTab.Liked}>Збережене</NavLink>

        <NavLink href={'/profile/' + ProfileTab.Surveys}>Анкетування</NavLink>

        <NavLink href={'/profile/' + ProfileTab.Requests}>Мої заявки</NavLink>

        <Button
          variant="link"
          rightIcon={() => <Icon name="logout" width={24} height={24} />}
          onClick={handleLogout}
          className={styles.logOut}
        >
          Вийти
        </Button>
      </div>
    </div>
  );
};
