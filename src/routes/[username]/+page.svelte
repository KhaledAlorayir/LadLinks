<script lang="ts">
  import Profile from "../../components/profile.svelte";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
</script>

<section>
  <Profile profileData={data.profile} />
</section>
