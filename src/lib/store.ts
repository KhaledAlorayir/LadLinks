import { writable } from "svelte/store";

export const editedUsername = writable<string | null>(null);
