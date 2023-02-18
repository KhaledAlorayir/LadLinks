<script lang="ts">
  import type { SocialEntry } from "$lib/schema";
  import type { Social_Types } from "@prisma/client";
  import { createEventDispatcher } from "svelte";

  export let socialTypes: Social_Types[];
  export let socialEntry: SocialEntry;
  export let index: number;

  const dispatch = createEventDispatcher();
</script>

<div class="social">
  <select required bind:value={socialEntry.typeId}>
    {#each socialTypes as social}
      <option value={social.id}>{social.name}</option>
    {/each}
  </select>
  <input type="url" name="image" bind:value={socialEntry.url} required />

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <p
    on:click={() => {
      dispatch("remove", { index });
    }}
    class:disabled={index === 0}
  >
    Remove
  </p>
</div>

<style>
  select {
    width: auto;
  }

  .social {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  p {
    color: #d41919;
    cursor: pointer;
  }

  p:hover {
    opacity: 0.7;
  }

  .disabled {
    pointer-events: none;
    opacity: 0.5;
  }
</style>
