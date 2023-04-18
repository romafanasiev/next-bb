import { signInWithEmailAndPassword } from 'firebase/auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { Awaitable, NextAuthOptions, User } from 'next-auth';
import { firebaseAuth } from 'utils';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, _req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const userCredential = await signInWithEmailAndPassword(
            firebaseAuth,
            email,
            password
          );

          if (userCredential) {
            return { ...userCredential.user } as unknown as Awaitable<User>;
          }

          return null;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
      credentials: {},
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);


