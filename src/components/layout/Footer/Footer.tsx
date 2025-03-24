import { Divider, Icon } from '@/components/ui';
import { colors } from '@/styles/colors';
import clsx from 'clsx';
import { Container } from '../Container/Container';
import styles from './styles.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className="grid">
          <div
            className={clsx(
              'col-desktop-1-1 col-tablet-1-1 col-1-2',
              styles.footer_logo,
            )}
          >
            <Icon
              width={83}
              height={70}
              name="logo-no-color"
              fill={colors.beige}
            />
          </div>

          <div className="col-desktop-5-8 col-tablet-2-5 col-1-2">
            <ul className={styles.menu}>
              <li>Про нас</li>
              <li>Як працюємо</li>
              <li>Відгуки</li>
              <li>Контакти</li>
            </ul>
          </div>

          <div className="col-desktop-12-12 col-tablet-6-6 col-1-2">
            <div className={styles.socials}>
              <Icon name="x" fill={colors.beige} width={20} height={20} />
              <Icon
                name="instagram"
                fill={colors.beige}
                width={20}
                height={20}
              />
              <Icon name="tiktok" fill={colors.beige} width={20} height={20} />
            </div>
          </div>

          <div
            className={clsx(
              'col-desktop-1-12 col-tablet-1-6 col-1-2',
              styles.divider,
            )}
          >
            <Divider variant="beige" />
          </div>

          <div className="col-desktop-1-3 col-tablet-1-3 col-1-1">
            <p className={clsx(styles.rights, styles['small-text'])}>
              ©2025. Всі права захищені. PawPal
            </p>
          </div>

          <div className="col-desktop-10-12 col-tablet-4-6 col-2-2">
            <p className={clsx(styles.confidentials, styles['small-text'])}>
              Політика конфіденційності
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};
