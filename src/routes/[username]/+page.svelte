<script lang="ts">
  import Profile from "../../components/profile.svelte";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;

  /*
    TODO: 
    - image should'nt be nullable / not given generate one
    - PR
  */
</script>

<section>
  <Profile profileData={data.profile} />
</section>
