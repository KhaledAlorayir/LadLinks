import { SvelteKitAuth } from "@auth/sveltekit";
import Discord from "@auth/core/providers/discord";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../prisma/client";
import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } from "$env/static/private";

export const handle = SvelteKitAuth({
  /* eslint-disable */
  providers: [
    // @ts-ignore
    Discord({
      clientId: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      //@ts-ignore
      session.user.uid = user.id;
      return session;
    },
  },
  // @ts-ignore
  adapter: PrismaAdapter(prisma),
});
