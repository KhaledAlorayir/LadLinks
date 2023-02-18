<script lang="ts">
  import type { ProfileBody } from "$lib/schema";
  import InfoForm from "../../components/infoForm.svelte";
  import { page } from "$app/stores";
  import SocialForm from "../../components/socialForm.svelte";
  import type { PageServerData } from "./$types";
  import type { FormStep } from "$lib/types";
  import Profile from "../../components/profile.svelte";

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

  let step: FormStep = 0;
  let username = "";
</script>

{#if step === 0}
  <section class="center">
    <div>
      <InfoForm {profileData} bind:step bind:username />
    </div>
  </section>
{:else if step === 1}
  <section class="center">
    <div>
      <button class="secondary" on:click={() => (step = 0)}>Back</button>
      <SocialForm {profileData} socialTypes={data.socialTypes} bind:step />
    </div>
  </section>
{:else}
  <section>
    <button class="secondary" on:click={() => (step = 1)}>Back</button>
    <Profile {profileData} />
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

  .secondary {
    width: auto;
    margin-bottom: 2rem;
  }
</style>
