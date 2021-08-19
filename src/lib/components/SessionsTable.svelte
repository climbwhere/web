<script lang="ts">
  import { DAYS_OF_WEEK } from "$lib/constants";
  import dayjs from "dayjs";
  import { keys } from "lodash";
  import groupBy from "lodash/groupBy.js";
  export let sessions: SvelteStore<Session[]>;

  let groupedSessions = groupBy(
    $sessions,
    (session) =>
      `${DAYS_OF_WEEK[dayjs(session.starts_at).day()]}, ${dayjs(
        session.starts_at
      ).format("DD/MM/YY")}`
  );
</script>

<div class="container">
  {#each Object.keys(groupedSessions) as date}
    <div class="column">
      <div class="column-header">
        {date}
      </div>
      {#each groupedSessions[date] as session}
        <div
          class={`session ${session.gym.slug}`}
          class:warn={session.spaces < 10}
          class:invalid={session.spaces < 1}
        >
          <div>
            <p class="gym">
              {session.gym.name}
            </p>
            <p>
              {dayjs(session.starts_at).format("DD/MM/YY hh:mmA")}
            </p>
          </div>
          <span class="spaces">
            {session.spaces} Spaces
          </span>
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
    min-width: 350px;
    margin-right: 15px;
    border-right: solid #f5f5f5 2px;
    padding: 0 15px 0 0;
    overflow-y: scroll;
  }

  .column-header {
    background: white;
    position: sticky;
    top: 0;
    z-index: 1;
    padding: 5px 0;
  }

  .session:hover,
  .session:active {
    background: #a2d2ff9c;
  }
  .session {
    content-visibility: auto;
    transition-duration: 0.4s;
    cursor: pointer;
    margin-top: 1px;
    width: 100%;
    max-width: 400px;
    margin: 10px 0;
    padding: 10px 15px;
    border-radius: 5px;
  }
  .spaces {
    position: absolute;
    top: 25%;
    right: 8px;
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
