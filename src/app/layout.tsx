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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'PawPal',
    description: 'PawPal - твій помічник у пошуку домашнього улюбленця',
  };

  return (
    <html lang="en" className={montserratAlternates.className}>
      <body>
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
          <ToastContainer />
        </QueryProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
      </body>
    </html>
  );
}
