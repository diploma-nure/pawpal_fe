import { ImagePart } from '@/features/sign-up/components/ImagePart/ImagePart';
import { SignUpForm } from '@/features/sign-up/components/SignUpForm/SignUpForm';
import styles from './page.module.scss';

export default function SignUp() {
  return (
    <>
      <div className={styles.signUp}>
        <SignUpForm />
      </div>
      <ImagePart />
    </>
  );
}
