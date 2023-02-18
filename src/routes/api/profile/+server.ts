import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { ProfileBodySchema } from "$lib/schema";
import prisma from "$lib/prisma";
import { isAvailable } from "$lib/usernameCheck";

export const POST = (async ({ locals, request }) => {
  const session = await locals.getSession();
  const validated = ProfileBodySchema.safeParse(await request.json());

  if (!session?.user || !session.user.uid) {
    throw error(401);
  }

  if (!validated.success) {
    throw error(400);
  }

  const profile = await prisma.profile.findUnique({
    where: {
      userId: session.user.uid,
    },
  });

  if (profile) {
    throw error(400, { message: "user already has a profile" });
  }

  if (await isAvailable(validated.data.username)) {
    throw error(400, { message: "username is used" });
  }

  const { imageUrl, username, socials, bio, isPublic } = validated.data;

  await prisma.profile.create({
    data: {
      username,
      imageUrl,
      bio,
      isPublic,
      userId: session.user.uid,
      socials: {
        createMany: { data: socials },
      },
    },
  });

  return new Response(null, { status: 201 });
}) satisfies RequestHandler;

export const PUT = (async ({ locals, request }) => {
  const session = await locals.getSession();
  const validated = ProfileBodySchema.safeParse(await request.json());

  if (!session?.user || !session.user.uid) {
    throw error(401);
  }

  if (!validated.success) {
    throw error(400);
  }

  const profile = await prisma.profile.findUnique({
    where: {
      userId: session.user.uid,
    },
  });

  if (!profile) {
    throw error(400, { message: "user has no profile" });
  }

  if (
    (await isAvailable(validated.data.username)) &&
    validated.data.username !== profile.username
  ) {
    throw error(400, { message: "username is used" });
  }

  const { imageUrl, username, socials, bio, isPublic } = validated.data;

  await prisma.profile.update({
    data: {
      username,
      imageUrl,
      bio,
      isPublic,
      userId: session.user.uid,
      socials: {
        createMany: { data: socials },
      },
    },
    where: {
      id: profile.id,
    },
  });

  return new Response(null, { status: 200 });
}) satisfies RequestHandler;
