<script>
  export let gym,
    onClick = () => {},
    gymSelected = false,
    gymUnselected = false;

  const handleBadgeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClick(gym.slug);
  };
</script>

<span
  class:selected={gymSelected}
  class:unselected={gymUnselected}
  on:click={handleBadgeClick}
  class={`badge ${gym.slug}`}>{gym.name}</span
>

<style>
  .fitbloc {
    background-color: #7b112a;
    color: white;
  }

  .boulder-plus {
    background-color: #652580;
    color: white;
  }

  .bff {
    background-color: #ea078d;
    color: black;
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
