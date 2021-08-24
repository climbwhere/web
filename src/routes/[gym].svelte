<script context="module" lang="ts">
  import { getGyms } from "$lib/api";

  export async function load({ page, fetch, session, context }) {
    const { gym } = page.params;
    const gyms = await getGyms();
    return { props: { gymFound: gyms.map((g) => g.slug).includes(gym) } };
  }
</script>

<script lang="ts">
  export let gymFound;
</script>

{gymFound && "Gym found"}
