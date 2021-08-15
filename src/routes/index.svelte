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

<h1>Where are you climbing today?</h1>
<p>Select a gym to get started</p>
{#each gyms as gym}
  <p>{gym.name}</p>
{/each}
<p>or</p>
<button>See all gyms</button>
