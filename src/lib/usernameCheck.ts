import prisma from "$lib/prisma";

export async function isAvailable(username: string) {
  const profiles = await prisma.profile.findMany({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
    },
  });

  return !profiles.length;
}
