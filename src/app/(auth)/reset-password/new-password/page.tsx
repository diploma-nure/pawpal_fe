import { NewPasswordForm } from '@/features/reset-password/components/NewPasswordForm/NewPasswordForm';
import { Suspense } from 'react';
import styles from './page.module.scss';

export default function ResetPassword() {
  return (
    <Suspense>
      <div className={styles.signUp}>
        <NewPasswordForm />
      </div>
    </Suspense>
  );
}
