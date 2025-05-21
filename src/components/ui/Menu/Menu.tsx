'use client';

import { ProfileButton } from '@/components/layout/Header/ProfileButton';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon/Icon';
import { ProfileTab } from '@/features/profile/constants/tabs';
import { useDisclosure } from '@/hooks/useDisclosure';
import { colors } from '@/styles/colors';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, useEffect } from 'react';
import styles from './styles.module.scss';

export const Menu: FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const pathName = usePathname();
  const profileOptionsAreVisible = pathName.includes('/profile');
  const adminOptionsAreVisible = pathName.includes('/admin');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <Button variant="link" className={styles.menu__button} onClick={onOpen}>
        <Icon name="menu" width={30} height={25} fill={colors.orange} />
      </Button>

      <nav
        className={clsx(styles.menu, {
          [styles['menu--open']]: isOpen,
        })}
        id="menu"
      >
        <div className={styles.menu__content}>
          <div className={styles.topBar}>
            <div className="col-desktop-1-2 col-tablet-1-1 col-1-1">
              <Icon width={83} height={70} name="logo" />
            </div>

            <div className={styles.topBar__actions}>
              <div className={styles.loginButton}>
                <ProfileButton />
              </div>

              <Button variant="link" onClick={onClose}>
                <Icon
                  name="boldCross"
                  width={30}
                  height={30}
                  fill={colors.orange}
                />
              </Button>
            </div>
          </div>

          <ul className={styles.navigation}>
            <Link href="/#about-us" onClick={onClose}>
              Про нас
            </Link>
            <Link href="/#how-we-work" onClick={onClose}>
              Як працюємо
            </Link>
            <Link href="/#reviews" onClick={onClose}>
              Відгуки
            </Link>
            <Link href="/#contacts" onClick={onClose}>
              Контакти
            </Link>
            {profileOptionsAreVisible && (
              <>
                <Link
                  onClick={onClose}
                  href={'/profile/' + ProfileTab.Contacts}
                >
                  Контактна інформація
                </Link>

                <Link onClick={onClose} href={'/profile/' + ProfileTab.Liked}>
                  Збережене
                </Link>

                <Link onClick={onClose} href={'/profile/' + ProfileTab.Surveys}>
                  Анкетування
                </Link>

                <Link
                  onClick={onClose}
                  href={'/profile/' + ProfileTab.Requests}
                >
                  Мої заявки
                </Link>
              </>
            )}

            {adminOptionsAreVisible && (
              <>
                <Link onClick={onClose} href="/admin/pets">
                  Тваринки
                </Link>
                <Link onClick={onClose} href="/admin/applications">
                  Заявки
                </Link>
                <Link onClick={onClose} href="/admin/meetings">
                  Відеоконференції
                </Link>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};
