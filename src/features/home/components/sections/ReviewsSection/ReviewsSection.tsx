import { Container } from '@/components/layout';
import { AccentText } from '@/components/ui';
import { colors } from '@/styles/colors';
import { ReviewCarousel } from '../../ui/ReviewCarousel/ReviewCarousel';
import styles from './styles.module.scss';

export const ReviewsSection = () => {
  return (
    <section className="section">
      <Container>
        <div className="grid">
          <div className="col-desktop-1-12 col-tablet-1-6 col-1-2">
            <h2 className={styles.title}>
              Відгуки наших{' '}
              <AccentText color={colors.orange}>щасливих</AccentText> друзів
            </h2>
          </div>
          <div className="col-desktop-1-12 col-tablet-1-6 col-1-2">
            <ReviewCarousel />
          </div>
        </div>
      </Container>
    </section>
  );
};
