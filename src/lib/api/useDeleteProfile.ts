import axios, { AxiosError } from "axios";
import { createMutation } from "@tanstack/svelte-query";
import { goto } from "$app/navigation";

export default function () {
  return createMutation({
    mutationFn: () => axios.delete("/api/profile"),
    onError: (err: AxiosError) => alert(err.message),
    onSuccess: () => goto("/"),
  });
}
