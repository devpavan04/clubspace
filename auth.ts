import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import Credentials from 'next-auth/providers/credentials';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool } from '@neondatabase/serverless';
import { loginSchema } from '@/schema/auth/schema';
import { getUserByEmail } from '@//services/user';
import bcryptjs from 'bcryptjs';

const neon = new Pool({
  connectionString: process.env.NEON_DATABASE_URL_POOLING,
});

const adapter = new PrismaNeon(neon);
const prisma = new PrismaClient({ adapter });

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      async authorize(credentials) {
        const validation = loginSchema.safeParse(credentials);

        if (validation.success) {
          const { email, password } = validation.data;

          const { data: user } = await getUserByEmail(email);

          if (!user) {
            return null;
          }

          const passwordMatch = await bcryptjs.compare(password, user.password);

          if (passwordMatch) {
            return user;
          }
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
