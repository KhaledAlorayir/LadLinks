<script lang="ts">
  import type { ProfileBody } from "../../lib/schema";
  import InfoForm from "../../components/infoForm.svelte";
  import { page } from "$app/stores";
  import SocialForm from "../../components/socialForm.svelte";
  import type { PageServerData } from "./$types";

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

  let infoFormFinished = false;
  let username = "";
</script>

<section>
  <div>
    {#if !infoFormFinished}
      <InfoForm {profileData} bind:infoFormFinished bind:username />
    {:else}
      <button class="secondary" on:click={() => (infoFormFinished = false)}
        >Back</button
      >
      <SocialForm {profileData} socialTypes={data.socialTypes} />
    {/if}
  </div>
</section>

<style>
  section {
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
