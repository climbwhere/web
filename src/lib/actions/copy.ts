export default function copy(node) {
  // node mount
  function handleClick(event) {
    navigator.clipboard.writeText(node.innerHTML);
  }

  node.addEventListener("click", handleClick);

  return {
    destroy() {
      // node removed
      node.removeEventListener("click", handleClick);
    },
  };
}
