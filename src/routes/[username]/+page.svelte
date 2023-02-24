<script lang="ts">
  import Profile from "../../components/profile.svelte";
  import type { PageServerData } from "./$types";
  import { page } from "$app/stores";
  import useDeleteProfile from "$lib/api/useDeleteProfile";

  export let data: PageServerData;
  const deleteProfile = useDeleteProfile();
</script>

<article>
  {#if $page.data.session?.user?.uid === data.profile.userId}
    <nav>
      <details role="list">
        <summary aria-haspopup="listbox">✍</summary>
        <ul role="listbox">
          <li><a href={`/edit`}>Edit Profile</a></li>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <li class="delete" on:click={() => $deleteProfile.mutate()}>
            Delete Profile
          </li>
        </ul>
      </details>
    </nav>
  {/if}
  <Profile profileData={data.profile} />
</article>

<style>
  nav {
    justify-content: flex-end;
  }

  .delete {
    cursor: pointer;
    transition: all 200ms;
  }

  .delete:hover {
    background-color: rgb(196, 70, 70);
    color: black;
  }
</style>
