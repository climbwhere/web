<script>
  import moment from "moment";
  import uniq from "lodash/uniq";
  import isEmpty from "lodash/isEmpty";

  import Skeleton from "~/components/Skeleton/DatePickerSkeleton.svelte";

  export let sessions, isLoading, selectedDate;

  const handleDateBoxClick = (d) => (e) => {
    e.preventDefault();
    selectedDate = d;
  };
</script>

<div class="container">
  {#if isLoading}
    <Skeleton />
  {:else}
    {#each uniq($sessions.map( (s) => moment(s.starts_at).format("DD/MM/YY") )) as date}
      <div
        class="date-box umami--click--click-date-filter"
        class:selected={selectedDate === date}
        on:click={handleDateBoxClick(date)}
      >
        <h3>
          {moment(date, "DD/MM/YY").format("DD")}
        </h3>
        <span class="date-title">
          {moment(date, "DD/MM/YY").format("ddd").toUpperCase()}
        </span>
      </div>
    {/each}
    {#if isEmpty(sessions)}
      <div class="empty">
        <b>Looks like there are currently no sessions...</b>
      </div>
    {/if}
  {/if}
</div>

<style>
  .container {
    padding-top: 10px;
    flex: 1;
    min-height: 60px;
    max-height: 60px;
    overflow-x: scroll;
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  .empty {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h3 {
    margin: 0;
    font-size: 1em;
  }

  .date-box {
    flex: 1;
    min-width: 80px;
    max-width: 80px;
    border: solid 3px transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 0 5px;
    background: white;
    transition-duration: 0.2s;
    cursor: pointer;
    -webkit-user-select: none;
    opacity: 0.5;
    filter: grayscale(1);
    border-radius: 10px;
  }

  .date-box.selected {
    border: solid 3px #4361ee;
    opacity: 1;
    filter: grayscale(0);
  }

  .date-title {
    color: #f44545;
    font-weight: 600;
    font-size: 14px;
  }
</style>
