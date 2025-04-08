import { ImageSide } from '@/features/reset-password/components/ImageSide/ImageSide';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PawPal',
  description: 'PawPal - your best friend in pet adoption',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ImageSide />
      {children}
    </>
  );
}
