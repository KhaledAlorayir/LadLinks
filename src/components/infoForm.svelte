<script lang="ts">
  import type { ProfileBody } from "$lib/schema";
  import type { FormStep } from "$lib/types";
  import UsernameInput from "./usernameInput.svelte";

  export let profileData: ProfileBody;
  export let step: FormStep;
  export let username: string;

  function submitHandler() {
    if (!profileData.username.trim()) {
      username = "";
    } else {
      step = 1;
    }
  }
</script>

<form on:submit|preventDefault={submitHandler}>
  <UsernameInput {profileData} bind:username />
  <label for="bio">
    Bio
    <textarea
      name="bio"
      rows="4"
      bind:value={profileData.bio}
      maxlength="260"
    />
  </label>
  <label for="image">
    Image
    <input type="url" name="image" bind:value={profileData.imageUrl} />
  </label>
  <button type="submit">Next</button>
</form>

<style>
  textarea {
    resize: none;
  }
</style>
