import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "./models/UserSchema";
import connectMongoDB from "../lib/mongodb";
import { userAgent } from "next/server";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                if (!credentials) return null;

                try {
                    await connectMongoDB();
                    const user = await User.findOne({ email: credentials.email }).lean();
                    if (user) {
                        const isMatch = await bcrypt.compare(
                            credentials.password as string,
                            user.password
                        );

                        if (isMatch) {
                            return {
                                id: user._id.toString(),
                                email: user.email,
                                name: user.name,
                            };
                        } else {
                            console.log("Email or Password is not correct");
                            return null;
                        }
                    } else {
                        console.log("User not found");
                        return null;
                    }
                } catch (error: any) {
                    console.log("An error occurred: ", error);
                    return null;
                }
            },
        }),
    ],
    callbacks:{
        async jwt ({ token, user }) {
          if (user?.id) token._id = user.id
          return token
        },
        async session ({ session, token, user }) {
            if (token?._id) session.user.id = token._id as string        
            if (token?.sub) session.user.id = token.sub
            if (user?.name) session.user.name = user.name
            return session
        },
    },
});