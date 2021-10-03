<script>
  import { amp, browser, dev, mode, prerendering } from "$app/env";

  import NavBar from "$lib/components/NavBar.svelte";
</script>

<svelte:head>
  {#if !dev}
    <script
      async
      defer
      data-website-id="0cf66065-68c8-4368-87b5-b3bee9d160be"
      src="https://umami.triomic.dev/umami.js"></script>
  {/if}
</svelte:head>

<NavBar />
<div class="container">
  <div class="content">
    <slot />
  </div>
</div>

<style>
  .container {
    margin: auto;
    width: 100%;
    max-width: 800px;
    background: white;
    overflow: clip;
  }
  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: clip;
  }
</style>
