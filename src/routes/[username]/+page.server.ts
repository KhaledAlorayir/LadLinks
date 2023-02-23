import type { PageServerLoad } from "./$types";
import prisma from "../../lib/prisma";
import { UsernameSchema } from "$lib/schema";
import { error } from "@sveltejs/kit";
import type { Profile } from "$lib/types";

export const load = (async ({ params, locals }) => {
  const validated = UsernameSchema.safeParse(params.username);
  const session = await locals.getSession();

  if (!validated.success) {
    throw error(400, "incorrect username");
  }

  const profile = await prisma.profile.findUnique({
    where: {
      username: validated.data,
    },
    include: {
      socials: {
        include: {
          type: true,
        },
      },
    },
  });

  if (
    !profile ||
    (!profile.isPublic && profile.userId !== session?.user?.uid)
  ) {
    throw error(404, "not found");
  }

  const parsedProfile: Profile = {
    username: profile.username,
    imageUrl: profile.imageUrl,
    isPublic: profile.isPublic,
    bio: profile.bio,
    socials: profile.socials.map((social) => ({
      type: social.type.name,
      typeId: social.typeId,
      url: social.url,
    })),
  };

  return {
    profile: parsedProfile,
  };
}) satisfies PageServerLoad;
