export default function scrollWheel (node){
	function handleScrollWheel(e) {
		node.dispatchEvent(new CustomEvent('scrollWheel', {
			detail: {deltaY: e.deltaY}
		}));
	}
	node.addEventListener('wheel', handleScrollWheel)
	return {
		destroy() {
				e.removeEventListener('wheel', handleScrollWheel)
		}
	}
}