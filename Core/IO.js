module.exports = ({ el, fnIn = null, fnOut = null } = {}) => {

	const options = {
		threshold: 0
	}

	// Triggers every time an intersection happens
	let cb = (entries, observer) => {
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



// class IO {
// 	constructor({ el, fnIn = null, fnOut = null } = {}) {

// 		this.el = el;
// 		this.fnIn = fnIn;
// 		this.fnOut = fnOut;

// 		const options = {
// 			threshold: 0
// 		}

// 		// Triggers every time an intersection happens
// 		let cb = (entries, observer) => {
// 			if (entries[0].isIntersecting) {
// 				// Element comes into the viewport
// 				if (this.fnIn) this.fnIn()
// 			} else {
// 				// Element leaves the viewport 
// 				if (this.fnOut) this.fnOut()
// 			}
// 		};

// 		const observer = new IntersectionObserver(cb, options);

// 		observer.observe(this.el);
// 	}
// }

// module.exports = IO
