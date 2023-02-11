<script lang="ts">
  import { signIn, signOut } from "@auth/sveltekit/client";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;
</script>

<div>
  <header>
    <nav>
      <ul>
        <li><strong>LadLinks</strong></li>
      </ul>
      <ul>
        <li>
          {#if !data.session}
            <button on:click={() => signIn()}>Sign in</button>
          {:else}
            <button on:click={() => signOut()}>Sign out</button>
          {/if}
        </li>
      </ul>
    </nav>
  </header>
  <main class="container">
    <slot />
  </main>
</div>

<style scoped>
  nav {
    padding: 1rem 2rem;
  }

  strong {
    font-size: 1.5rem;
  }

  div {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
  }
</style>
