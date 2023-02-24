<script lang="ts">
  //@ts-nocheck
  import { stopTyping } from "$lib/util/on-stop-typing";
  import { createQuery } from "@tanstack/svelte-query";
  import type { ProfileBody } from "$lib/schema";
  import axios from "axios";
  import { editedUsername } from "$lib/store";

  let usernameLookupQuery = "";
  export let username: string;
  export let profileData: ProfileBody;

  $: query = createQuery({
    queryKey: ["usernameLookup"],
    queryFn: async () => {
      const { data } = await axios.get<{ available: boolean }>(
        "/api/profile/username",
        {
          params: {
            q: usernameLookupQuery,
          },
        }
      );
      data.available =
        data.available ||
        usernameLookupQuery.trim().toLocaleLowerCase() ===
          $editedUsername?.toLocaleLowerCase();
      return data;
    },
    enabled: !!usernameLookupQuery.trim(),
    onSuccess: ({ available }) => {
      profileData.username = available ? usernameLookupQuery : "";
    },
  });
</script>

<label for="username">
  Username
  {#if $query.isFetching}
    <span aria-busy="true" />
  {/if}
  <input
    aria-invalid={!$query.isSuccess || !usernameLookupQuery.trim()
      ? "spelling"
      : !$query.data?.available}
    type="text"
    name="username"
    maxlength="40"
    use:stopTyping
    on:stopTyping={() => {
      usernameLookupQuery = username;
    }}
    on:focusout={() => {
      usernameLookupQuery = username;
    }}
    bind:value={username}
    required
  />
  {#if $query.isSuccess && !$query.data.available && username.trim()}
    <small>username is not available.</small>
  {/if}
</label>

<style>
  small {
    color: #ff0000;
  }
</style>
