import { loginGoogle } from '@/features/sign-up/api/loginGoogle';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { cookies } from 'next/headers';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  callbacks: {
    async signIn({ account }) {
      const cookieStore = await cookies();
      const response = await loginGoogle({
        token: account?.id_token as string,
      });
      cookieStore.set('token', response.data.token, {
        maxAge: 60 * 60,
      });

      cookieStore.set('isNewUser', response.data.isNewUser ? 'true' : 'false', {
        maxAge: 60 * 60,
      });

      return true;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async redirect({ url, baseUrl }) {
      const cookieStore = await cookies();
      const isNewUser = cookieStore.get('isNewUser')?.value === 'true';

      if (isNewUser) {
        return `${baseUrl}/survey`;
      }

      return baseUrl;
    },
  },
});

export { handler as GET, handler as POST };
