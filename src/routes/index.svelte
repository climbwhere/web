<script context="module" lang="ts">
  const { VITE_API_URL: API_URL } = import.meta.env;

  export async function load({ page, fetch, session, context }) {
    const { data: gyms } = await fetch(`${API_URL}/gyms`).then((r) => r.json());
    return { props: { gyms } };
  }
</script>

<script lang="ts">
  export let gyms: Gym[] = [];
</script>

<h2>Select gym:</h2>
<div class="gyms">
  {#each gyms as gym}
    <span class={`badge ${gym.slug}`}>
      {gym.name}
    </span>
  {/each}
</div>
<b> or </b>
<button>See all gyms</button>

<style>
  .gyms {
    display: flex;
    flex-wrap: wrap;
    background: #f5f5f54f;
    border: solid #f5f5f5 2px;
    border-radius: 20px;
    padding: 10px;
    margin-bottom: 10px;
  }

  h2 {
    margin: 10px 0;
  }
  button {
    margin-left: 5px;
  }
</style>
