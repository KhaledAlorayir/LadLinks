import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import prisma from "$lib/prisma";

export const load = (async ({ locals }) => {
  const session = await locals.getSession();

  if (!session?.user || !session.user.uid) {
    throw redirect(303, "/auth/signin");
  }

  const profile = await prisma.profile.findUnique({
    where: {
      userId: session.user.uid,
    },
    include: {
      socials: {
        include: {
          type: true,
        },
      },
    },
  });

  if (!profile) {
    throw error(404, "not found");
  }

  const socialTypes = await prisma.social_Types.findMany();

  return { profile, socialTypes };
}) satisfies PageServerLoad;
