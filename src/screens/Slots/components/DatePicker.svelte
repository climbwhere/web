<script>
  import moment from "moment";
  import uniq from "lodash/uniq";

  import Skeleton from "~/components/Skeleton/DatePickerSkeleton.svelte";

  export let sessionsRequest, selectedDate;

  const handleDateBoxClick = (d) => (e) => {
    e.preventDefault();
    selectedDate = d;
  };
</script>

<div class="container">
  {#await sessionsRequest}
    <Skeleton />
  {:then sessions}
    {#each uniq(sessions.map((s) => s._date)) as date}
      <div
        class="date-box"
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
  {/await}
</div>

<style>
  .container {
    flex: 1;
    max-height: 90px;
    overflow-x: scroll;
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 10px 0;
  }

  h3 {
    margin: 0;
    font-size: 1.2em;
  }

  .date-box {
    flex: 1;
    min-width: 80px;
    max-width: 80px;
    border: solid 3px #f5f5f5;
    padding: 15px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 0 5px;
    background: white;
    border-radius: 15px;
    transition-duration: 0.2s;
    cursor: pointer;
    -webkit-user-select: none;
  }

  .date-box.selected {
    border: solid 3px rgb(0, 119, 255);
  }

  .date-title {
    color: rgb(243, 87, 70);
    font-weight: 600;
    font-size: 14px;
  }
</style>
