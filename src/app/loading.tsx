import { Container, Header } from '@/components/layout';
import { Footer } from 'react-day-picker';

export default function Loading() {
  return (
    <>
      <Header />
      <Container>
        <p className="heading3">
          Зачекайте, будь ласка, відбувається завантаження
        </p>
      </Container>
      <Footer />
    </>
  );
}
