import { error, redirect } from "@sveltejs/kit";

export async function AuthenticateEndpoint(locals: App.Locals) {
  const session = await locals.getSession();

  if (!session?.user || !session.user.uid) {
    throw error(401);
  }

  return session.user.uid;
}

export async function AuthenticatePage(locals: App.Locals) {
  const session = await locals.getSession();

  if (!session?.user || !session.user.uid) {
    throw redirect(303, "/auth/signin");
  }

  return session.user.uid;
}
