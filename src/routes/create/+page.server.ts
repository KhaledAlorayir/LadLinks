import type { PageServerLoad } from "./$types";
import prisma from "../../lib/prisma";
import { redirect } from "@sveltejs/kit";

export const load = (async ({ locals }) => {
  const session = await locals.getSession();

  if (!session?.user) {
    throw redirect(303, "/auth/signin");
  }
  // HANDLE IF USER ALREADY HAS A PROFILE (navigate to profile page)

  const socialTypes = await prisma.social_Types.findMany();
  return {
    socialTypes,
  };
}) satisfies PageServerLoad;
