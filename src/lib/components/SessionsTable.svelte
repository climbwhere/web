<script lang="ts">
  import { getSessionsByDateTime } from "$lib/stores";
  import dayjs from "dayjs";

  export let sessionsStore: SvelteStore<Session[]>;
  const sessionsByDateTime = getSessionsByDateTime(sessionsStore);
</script>

<div class="container">
  {#each Object.keys($sessionsByDateTime) as date}
    <div class="column">
      <div class="column-header">
        {date}
      </div>
      {#each Object.keys($sessionsByDateTime[date]) as time}
        <div class="timeslot">
          <i>{time.split(" ")[1]}</i>
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
  {/each}
</div>

<style>
  p {
    margin: 0;
  }
  .container {
    overflow-x: scroll;
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: row;
  }
  .column {
    flex: 1;
    min-width: 300px;
    margin-right: 15px;
    border-right: solid #f5f5f5 2px;
    padding: 0 15px 0 0;
    overflow-y: scroll;
  }

  .timeslot {
    margin: 30px 0;
    border-top: solid #f5f5f5 2px;
    padding: 10px 0 0 0;
  }

  .column-header {
    background: white;
    position: sticky;
    top: 0;
    z-index: 1;
    padding: 5px 0;
    font-size: 1.1em;
    font-weight: bold;
  }

  .session:hover,
  .session:active {
    background: #a2d2ff9c;
  }
  .session {
    content-visibility: auto;
    transition-duration: 0.4s;
    cursor: pointer;
    width: 100%;
    max-width: 400px;
    margin: 5px 0;
    padding: 10px 15px;
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
    padding: 5px 10px;
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
