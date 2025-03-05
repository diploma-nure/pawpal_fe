import { Button } from '@/components/Button/Button';
import { MultiSelect } from '@/components/Select/Select';
import styles from './page.module.scss';

export default function Home() {
  const sortOptions = [
    'За датою додавання (спочатку нові додані)',
    'За віком (спочатку молодші)',
    'За розміром (спочатку маленькі)',
    'За розміром (спочатку великі)',
  ];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Button>Click</Button>
        <div style={{ maxWidth: '300px' }}>
          <MultiSelect options={sortOptions} />
        </div>
      </main>
    </div>
  );
}
