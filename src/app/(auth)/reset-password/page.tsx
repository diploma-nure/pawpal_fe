import { ForgotPasswordForm } from '@/features/reset-password/components/ForgotPasswordForm/ForgotPasswordForm';
import styles from './page.module.scss';

export default function ResetPassword() {
  return (
    <div className={styles.signUp}>
      <ForgotPasswordForm />
    </div>
  );
}
