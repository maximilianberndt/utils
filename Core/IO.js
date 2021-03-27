export const io = ({ el, fnIn = null, fnOut = null } = {}) => {

	const options = {
		threshold: 0
	}

	// Triggers every time an intersection happens
	const cb = (entries, observer) => {
		if (entries[0].isIntersecting) {
			// Element comes into the viewport
			if (fnIn) fnIn()
		} else {
			// Element leaves the viewport 
			if (fnOut) fnOut()
		}
	};

	const observer = new IntersectionObserver(cb, options);

	observer.observe(el);
}