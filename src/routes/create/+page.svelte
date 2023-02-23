<script lang="ts">
  import type { ProfileBody } from "$lib/schema";
  import InfoForm from "../../components/infoForm.svelte";
  import { page } from "$app/stores";
  import SocialForm from "../../components/socialForm.svelte";
  import type { PageServerData } from "./$types";
  import type { FormStep } from "$lib/types";
  import Profile from "../../components/profile.svelte";
  import type { Profile as ProfileType } from "$lib/types";
  import useCreateProfile from "$lib/api/useCreateProfile";

  export let data: PageServerData;

  let profileData: ProfileBody = {
    username: "",
    imageUrl: $page.data.session?.user?.image
      ? $page.data.session?.user?.image
      : "",
    isPublic: true,
    bio: "",
    socials: [{ url: "", typeId: data.socialTypes[0].id }],
  };

  let conformationData: ProfileType | null = null;
  let step: FormStep = 0;
  let username = "";
  const createProfile = useCreateProfile();
</script>

{#if $createProfile.isLoading}
  <section class="center">
    <progress />
  </section>
{:else if step === 0}
  <section class="center">
    <div>
      <InfoForm {profileData} bind:step bind:username />
    </div>
  </section>
{:else if step === 1}
  <section class="center">
    <div>
      <button class="secondary btn-small" on:click={() => (step = 0)}
        >Back</button
      >
      <SocialForm
        {profileData}
        socialTypes={data.socialTypes}
        bind:conformationData
        bind:step
      />
    </div>
  </section>
{:else if conformationData}
  <section>
    <div class="controls">
      <button class="secondary" on:click={() => (step = 1)}>Back</button>
      <button on:click={() => $createProfile.mutate(profileData)}>Create</button
      >
    </div>
    <Profile profileData={conformationData} />
  </section>
{/if}

<style>
  .center {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  div {
    width: 100%;
  }

  .btn-small {
    width: auto;
    margin-bottom: 2rem;
  }

  .controls button {
    width: auto;
  }

  .controls {
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
