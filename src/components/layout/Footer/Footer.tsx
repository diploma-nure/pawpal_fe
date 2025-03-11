import { Divider, Icon } from '@/components/ui';
import clsx from 'clsx';
import { Container } from '../Container/Container';
import styles from './styles.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className="grid">
          <div className="col-desktop-1-1">
            <Icon width={80} height={48} name="logo-no-color" fill="#FEFAF4" />
          </div>

          <div className="col-desktop-5-8">
            <ul className={styles.menu}>
              <li>Про нас</li>
              <li>Як працюємо</li>
              <li>Відгуки</li>
              <li>Контакти</li>
            </ul>
          </div>

          <div className="col-desktop-12-12">
            <div className={styles.socials}>
              <Icon name="x" fill="#FEFAF4" width={20} height={20} />
              <Icon name="instagram" fill="#FEFAF4" width={20} height={20} />
              <Icon name="tiktok" fill="#FEFAF4" width={20} height={20} />
            </div>
          </div>

          <div className={clsx('col-desktop-1-12', styles.divider)}>
            <Divider variant="beige" />
          </div>

          <div className="col-desktop-1-3">
            <p className={clsx(styles.rights, styles['small-text'])}>
              ©2025. Всі права захищені. PawPal
            </p>
          </div>

          <div className="col-desktop-10-12">
            <p className={clsx(styles.confidentials, styles['small-text'])}>
              Політика конфіденційності
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};
