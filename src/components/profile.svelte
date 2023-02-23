<script lang="ts">
  import type { Profile } from "$lib/types";

  export let profileData: Profile;
</script>

<section>
  <header>
    <img src={profileData.imageUrl} alt="profile" />
    {#if !profileData.bio?.length}
      <h5>{profileData.username}</h5>
    {:else}
      <hgroup>
        <h5>{profileData.username}</h5>
        <h6>{profileData.bio}</h6>
      </hgroup>
    {/if}
  </header>
  <ul>
    {#each profileData.socials as social, i (i)}
      <li>
        <a href={social.url} target="_blank" rel="noreferrer">{social.type}</a>
      </li>
    {/each}
  </ul>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    display: block;
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    margin: 0.5rem auto;
  }

  ul,
  li {
    list-style-type: none;
    list-style: none;
  }

  header {
    text-align: center;
  }
</style>
