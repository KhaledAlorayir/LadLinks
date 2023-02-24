<script lang="ts">
  import Profile from "../../components/profile.svelte";
  import type { PageServerData } from "./$types";
  import { page } from "$app/stores";

  export let data: PageServerData;
</script>

<article>
  {#if $page.data.session?.user?.uid === data.profile.userId}
    <nav>
      <details role="list">
        <summary aria-haspopup="listbox">✍</summary>
        <ul role="listbox">
          <li><a href={`/edit`}>Edit Profile</a></li>
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
</style>
