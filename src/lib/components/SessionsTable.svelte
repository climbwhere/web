<script lang="ts">
  import { getSessionsTableData } from "$lib/stores";
  import type { Readable } from "svelte/store";
  import { goto, prefetch } from "$app/navigation";
  import scrollWheel from "$lib/actions/scrollWheel";
  import pannable from "$lib/actions/pannable";

  export let extended = false;
  export let snapshotStore: Readable<Snapshot>;
  export let gymFilter: SvelteStore<string[]>;
  const sessionsByDateTime = getSessionsTableData(snapshotStore, gymFilter);

  function handleScrollWheel(e) {
    const { deltaY, offsetY } = e.detail;
    if (offsetY <= 100) {
      extended = deltaY > 0;
    }
  }
  function handlePanMove(e) {
    const { dy, offsetY } = e.detail;
    if (dy < 0 && offsetY <= 100) {
      extended = true;
    }
    if (dy > 0 && offsetY <= 100) {
      extended = false;
    }
  }

  const handleSessionClick = (gymSlug: string) => () => {
    goto("/gym/" + gymSlug);
  };
  const handleSessionMouseDown = (gymSlug: string) => () => {
    prefetch("/gym/" + gymSlug);
  };
</script>

<div
  class="container"
  use:pannable
  on:panmove={handlePanMove}
  use:scrollWheel
  on:scrollWheel={handleScrollWheel}
>
  {#each Object.keys($sessionsByDateTime) as date}
    <div class="column">
      <div class="column-header">
        {date}
      </div>
      <div>
        {#each Object.keys($sessionsByDateTime[date]) as time}
          <div class="timeslot">
            <span class="time-label">{time.split(" ")[1]}</span>
            {#each $sessionsByDateTime[date][time] as session}
              <div
                class={`session ${session.gym}`}
                class:invalid={session.spaces < 1}
                on:click={handleSessionClick(session.gym)}
                on:mousedown={handleSessionMouseDown(session.gym)}
              >
                <span class="gym">
                  {session.gym_id}
                </span>
                <span
                  class="spaces"
                  class:warn={session.spaces < 10}
                  class:invalid={session.spaces < 1}
                >
                  {session.spaces} Spaces
                </span>
              </div>
            {/each}
          </div>
        {/each}
      </div>
    </div>
  {/each}
</div>

<style>
  .container {
    overflow-y: scroll;
    margin-top: 10px;
    padding-bottom: 50px;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .column {
    flex: 1;
    margin-top: 5px;
    min-width: 50%;
    max-width: 450px;
    padding: 5px;
    border-radius: 5px;
  }

  @media only screen and (max-width: 800px) {
    .column {
      width: 100%;
      min-width: 50%;
    }
  }

  @media only screen and (max-width: 600px) {
    .column {
      width: 100%;
      min-width: 100%;
      max-width: 100%;
    }
  }

  .timeslot {
    padding: 5px 5px;
    border: solid 2px #f5f5f5;
    border-radius: 5px;
    margin: 10px 0;
  }

  .timeslot:hover {
    border: solid 2px #4361ee;
  }
  .column-header {
    background: black;
    color: white;
    position: sticky;
    top: 0;
    z-index: 1;
    padding: 10px;
    font-size: 0.9em;
    font-weight: bold;
    margin-bottom: 10px;
    border-radius: 10px 10px 0 0;
  }
  .session:hover,
  .session:active {
    background: #a2d2ff9c;
  }
  .session {
    content-visibility: auto;
    cursor: pointer;
    width: 100%;
    margin: 3px 0;
    padding: 5px 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
  }
  .spaces {
    float: right;
    text-align: right;
    padding-right: 10px;
    font-weight: bold;
    background: white;
    color: black;
    padding: 5px;
    border-radius: 5px;
  }

  .gym {
    font-weight: bold;
    flex: 1;
  }

  .warn {
    color: #ffad49;
  }

  .invalid {
    color: #f44545;
    text-decoration: line-through;
    opacity: 0.6;
    background: #f4454565;
  }

  .time-label {
    font-size: 0.8em;
    font-weight: bold;
  }
</style>
