<script lang="ts">
  import type { ProfileBody, SocialEntry } from "$lib/schema";
  import type { Social_Types } from "@prisma/client";
  import SocialEntryInput from "./socialEntryInput.svelte";

  export let profileData: ProfileBody;
  export let socialTypes: Social_Types[];

  function submitHandler() {}

  function addInputHandler() {
    if (profileData.socials.length === 15) {
      return;
    }
    profileData.socials.push({ url: "", typeId: socialTypes[0].id });
    profileData.socials = profileData.socials;
  }

  function removeInputHandler(e: CustomEvent<{ index: number }>) {
    profileData.socials = profileData.socials.filter(
      (_, i) => e.detail.index !== i
    );
  }
</script>

<form on:submit|preventDefault={submitHandler}>
  <div class="controls">
    <button
      class="outline"
      type="button"
      disabled={profileData.socials.length === 15}
      on:click={addInputHandler}>Add More</button
    >
    <label for="switch">
      <input
        type="checkbox"
        name="switch"
        role="switch"
        bind:checked={profileData.isPublic}
      />
      Public Profile
    </label>
  </div>
  <div class="social_cont">
    {#each profileData.socials as socialEntry, i (i)}
      <SocialEntryInput
        {socialTypes}
        {socialEntry}
        index={i}
        on:remove={removeInputHandler}
      />
    {/each}
  </div>
  <button type="submit">Next</button>
</form>

<style>
  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4rem;
  }

  .controls button {
    width: auto;
  }

  .social_cont {
    margin-bottom: 2rem;
  }
</style>
