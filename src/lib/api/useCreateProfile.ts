import { createMutation } from "@tanstack/svelte-query";
import axios, { AxiosError } from "axios";
import { goto } from "$app/navigation";
import type { ProfileBody } from "$lib/schema";

export default function () {
  return createMutation({
    mutationFn: async (profileData: ProfileBody) => {
      profileData.bio = profileData.bio?.trim().length
        ? profileData.bio.trim()
        : null;

      profileData.imageUrl = profileData.imageUrl?.length
        ? profileData.imageUrl
        : null;
      return axios.post("/api/profile", profileData);
    },
    onError: (err: AxiosError) => alert(err.message),
    onSuccess: (_, variables) => goto(`/${variables.username.trim()}`),
  });
}
