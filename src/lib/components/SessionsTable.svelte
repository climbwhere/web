<script lang="ts">
  import { getSessionsTableData } from "$lib/stores";
  import type { Writable } from "svelte/store";
  import scrollWheel from "$lib/actions/scrollWheel";
  import pannable from "$lib/actions/pannable";

  export let extended = false;
  export let sessionsStore: SvelteStore<Session[]>;
  export let gymFilter: Writable<[]>;
  const sessionsByDateTime = getSessionsTableData(sessionsStore, gymFilter);

  function handleScrollWheel(e) {
    const { deltaY } = e.detail;
    extended = deltaY > 0;
  }
  function handlePanMove(e) {
    const { dy, offsetY } = e.detail;
    if (dy < 0) {
      extended = true;
    }
    if (dy > 0 && offsetY <= 100) {
      extended = false;
    }
  }
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
            {time.split(" ")[1]}
            {#each $sessionsByDateTime[date][time] as session}
              <div
                class={`session ${session.gym.slug}`}
                class:warn={session.spaces < 10}
                class:invalid={session.spaces < 1}
              >
                <span class="gym">
                  {session.gym.name}
                </span>
                <span class="spaces">
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
    padding-bottom: 50px;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .column {
    content-visibility: auto;
    flex: 1;
    margin-top: 5px;
    min-width: 33%;
    max-width: 450px;
    padding: 10px;
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
    padding: 5px 0;
    border-radius: 10px;
  }

  .timeslot:hover {
    background: aliceblue;
  }
  .column-header {
    background: white;
    position: sticky;
    top: 0;
    z-index: 1;
    padding: 10px 0;
    font-size: 0.9em;
    font-weight: bold;
  }
  .session:hover,
  .session:active {
    background: #a2d2ff9c;
  }
  .session {
    content-visibility: auto;
    cursor: pointer;
    width: 100%;
    margin: 5px 0;
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
</style>
