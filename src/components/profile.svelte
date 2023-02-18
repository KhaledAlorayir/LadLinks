<script lang="ts">
  import type { ProfileBody } from "$lib/schema";
  //figure out how to get label here and make reusable between create & view
  export let profileData: {
    bio?: string | null | undefined;
    username: string;
    isPublic: boolean;
    imageUrl: string;
    socials: {
      url: string;
      typeId: number;
      type: string;
    }[];
  };
</script>

<section>
  <div>
    <img src={profileData.imageUrl} alt="profile" />
    <h5>{profileData.username}</h5>
    {#if profileData.bio?.length}
      <p>{profileData.bio}</p>
    {/if}
  </div>
  <div>
    <ul>
      {#each profileData.socials as social, i (i)}
        <li><a href={social.url} target="_blank" rel="noreferrer">Link</a></li>
      {/each}
    </ul>
  </div>
</section>

<style>
  section {
    text-align: center;
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
</style>
