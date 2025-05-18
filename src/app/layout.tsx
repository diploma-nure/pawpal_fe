import { AuthProvider } from '@/config/Auth/AuthProvider';
import '@/styles/main.scss';
import { ToastContainer } from 'react-toastify';

import { QueryProvider } from '@/lib/QueryProvider';
import { Montserrat_Alternates } from 'next/font/google';

const montserratAlternates = Montserrat_Alternates({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['cyrillic', 'latin', 'cyrillic-ext'],
  display: 'swap',
  variable: '--montserrat-alternates',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserratAlternates.className}>
      <body>
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
          <ToastContainer />
        </QueryProvider>
      </body>
    </html>
  );
}
