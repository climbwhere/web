<script>
  export let gym,
    onClick = () => {},
    gymSelected = false,
    gymUnselected = false;

  const handleBadgeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClick(gym.id);
  };
</script>

<span
  class:selected={gymSelected}
  class:unselected={gymUnselected}
  on:click={handleBadgeClick}
  class={`badge ${gym.slug} umami--click--${gym.slug}-click`}>{gym.name}</span
>

<style>
  .boruda {
    background-color: #ffffed;
  }

  .b8a {
    background-color: #dc722c;
    color: white;
  }

  .fitbloc {
    background-color: #7b112a;
    color: white;
  }

  .boulder-plus-aperia {
    background-color: #652580;
    color: white;
  }

  .boulder-plus-chevrons {
    background-color: #652580;
    color: white;
  }

  .bff-bendemeer {
    background-color: #ea078d;
    color: white;
  }

  .bff-bukit-timah {
    background-color: #ea078d;
    color: white;
  }

  .boulder-world {
    background-color: #0c606b;
    color: white;
  }

  .lighthouse {
    background-color: #9e0102;
    color: white;
  }

  .z-vertigo {
    background-color: yellow;
    color: black;
  }

  .oyeyo {
    background-color: #ef1e29;
    color: white;
  }

  .the-rock-school {
    background-color: black;
    color: white;
  }

  .boulder-planet {
    background-color: #e1b6a5;
    color: #181818;
  }

  .boulder-movement-downtown,
  .boulder-movement-tai-seng,
  .boulder-movement-rochor {
    background-color: #ee4469;
    color: white;
  }
</style>
