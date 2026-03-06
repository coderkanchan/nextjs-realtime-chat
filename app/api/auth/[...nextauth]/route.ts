import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import mongoose from "mongoose";
import { User } from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      await mongoose.connect(process.env.MONGO_URI!);
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        await User.create({
          
          username: (user?.name || "User").replace(/\s+/g, '').toLowerCase() + Math.floor(Math.random() * 1000),
          email: user.email,
          password: "GOOGLE_AUTH_USER",
        });
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) token.username = user.name;
      return token;
    },
    async session({ session, token }) {
      return { ...session, user: { ...session.user, username: token.username } };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };