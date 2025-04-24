import { ForgotPasswordForm } from '@/features/reset-password/components/ForgotPasswordForm/ForgotPasswordForm';
import { Suspense } from 'react';
import styles from './page.module.scss';

export default function ResetPassword() {
  return (
    <Suspense>
      <div className={styles.signUp}>
        <ForgotPasswordForm />
      </div>
    </Suspense>
  );
}
