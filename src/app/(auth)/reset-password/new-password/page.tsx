import { NewPasswordForm } from '@/features/reset-password/components/NewPasswordForm/NewPasswordForm';
import styles from './page.module.scss';

export default function ResetPassword() {
  return (
    <>
      <div className={styles.signUp}>
        <NewPasswordForm />
      </div>
    </>
  );
}
