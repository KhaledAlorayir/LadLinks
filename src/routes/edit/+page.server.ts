import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import prisma from "$lib/prisma";
import { AuthenticatePage } from "$lib/util/authenticate";

export const load = (async ({ locals }) => {
  const userId = await AuthenticatePage(locals);

  const profile = await prisma.profile.findUnique({
    where: {
      userId,
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
  profile.imageUrl = profile.imageUrl.includes("api.dicebear")
    ? ""
    : profile.imageUrl;

  return { profile, socialTypes };
}) satisfies PageServerLoad;
