import type { PageServerLoad } from "./$types";
import prisma from "../../lib/prisma";
import { redirect } from "@sveltejs/kit";
import { AuthenticatePage } from "$lib/util/authenticate";

export const load = (async ({ locals }) => {
  const userId = await AuthenticatePage(locals);

  const profile = await prisma.profile.findUnique({
    where: {
      userId,
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
