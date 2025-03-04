import { Button } from '@/components/Button/Button';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Button>Click</Button>
      </main>
    </div>
  );
}
