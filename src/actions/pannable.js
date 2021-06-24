export default function pannable(node) {
	let x;
	let y;

	function handleMousedown(event) {
		x = event.touches[0].clientX;
		y = event.touches[0].clientY;

		node.dispatchEvent(new CustomEvent('panstart', {
			detail: { x, y }
		}));

		window.addEventListener('touchmove', handleMousemove);
		window.addEventListener('touchend', handleMouseup);
	}

	function handleMousemove(event) {
		const dx = event.touches[0].clientX - x;
		const dy = event.touches[0].clientY - y;
		x = event.touches[0].clientX;
		y = event.touches[0].clientY;

		node.dispatchEvent(new CustomEvent('panmove', {
			detail: { x, y, dx, dy, offsetY: node.scrollTop }
		}));
	}

	function handleMouseup(event) {
		window.removeEventListener('touchmove', handleMousemove);
		window.removeEventListener('touchend', handleMouseup);
	}

	node.addEventListener('touchstart', handleMousedown);

	return {
		destroy() {
			node.removeEventListener('touchstart', handleMousedown);
		}
	};
}