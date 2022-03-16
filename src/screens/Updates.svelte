<script>
  import updatesMD from "~/resource/smm-updates.md";
  import "~/table.css";
</script>

<div id="updates" class="container">
  {@html updatesMD.body}
</div>

<style>
  .container {
    overflow-y: scroll;
    height: 100%;
    padding: 0.5rem 1rem;
    padding-bottom: 1rem;
  }
</style>
