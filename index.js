exports.utils = {
	// Core
	io: require('./Core/io'),
	mouse: require('./Core/MouseObserver'),
	raf: require('./Core/raf'),
	scroll: require('./Core/ScrollObserver'),
	storage: require('./Core/storage'),
	
	// Functions
	bind: require('./Functions/bind'),
	debounce: require('./Functions/debounce'),
	getPerformance: require('./Functions/get-performance'),
	prefetch: require('./Functions/prefetch'),
	sniffBrowser: require('./Functions/sniff-browser'),
	sniffMobile: require('./Functions/sniff-mobile'),
	
	// Math
	clamp: require('./Math/clamp'),
	dist: require('./Math/dist'),
	lerp: require('./Math/lerp'),
	map: require('./Math/map'),
	rand: require('./Math/rand'),
	round: require('./Math/round'),
	smoothstep: require('./Math/smoothstep'),
}