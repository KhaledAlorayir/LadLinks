import type { RequestHandler } from "./$types";
import { z } from "zod";
import { error, json } from "@sveltejs/kit";
import { isAvailable } from "$lib/util/usernameCheck";
import { UsernameSchema } from "$lib/schema";

export const GET = (async ({ url }) => {
  const validated = UsernameSchema.safeParse(url.searchParams.get("q"));

  if (!validated.success) {
    throw error(400);
  }

  const available = await isAvailable(validated.data);

  return json({ available }, { status: 200 });
}) satisfies RequestHandler;
