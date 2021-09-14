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

<div class="container">
  <NavBar />
  <div class="content">
    <slot />
  </div>
</div>

<style>
  .container {
    margin: auto;
    height: 100%;
    width: 100%;
    max-width: 800px;
    background: white;
    display: grid;
    grid-template-rows: 55px auto;
  }
  .content {
    height: calc(100vh - 55px);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
</style>
