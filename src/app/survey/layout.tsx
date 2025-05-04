import styles from './page.module.scss';

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className={styles.main}>{children}</main>;
}
