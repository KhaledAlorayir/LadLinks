import type { PageServerLoad } from "./$types";
import prisma from "../../lib/prisma";
import { redirect } from "@sveltejs/kit";

export const load = (async ({ locals }) => {
  const session = await locals.getSession();

  if (!session?.user || !session.user.uid) {
    throw redirect(303, "/auth/signin");
  }

  const profile = await prisma.profile.findUnique({
    where: {
      userId: session.user.uid,
    },
  });

  if (profile) {
    throw redirect(303, `/${profile.username}`);
  }

  const socialTypes = await prisma.social_Types.findMany();
  return {
    socialTypes,
  };
}) satisfies PageServerLoad;
