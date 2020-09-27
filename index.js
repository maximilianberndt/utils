// Core
const io = require('./Core/io')
const mouse = require('./Core/MouseObserver')
const raf = require('./Core/raf')
const scroll = require('./Core/ScrollObserver')
const storage = require('./Core/storage')

// Functions
const bind = require('./Functions/bind')
const debounce = require('./Functions/debounce')
const getPerformance = require('./Functions/get-performance')
// const lazy = require('./Functions/lazy')
const prefetch = require('./Functions/prefetch')
const sniffBrowser = require('./Functions/sniff-browser')
const sniffMobile = require('./Functions/sniff-mobile')

// Math
const clamp = require('./Math/clamp')
const dist = require('./Math/dist')
const lerp = require('./Math/lerp')
const map = require('./Math/map')
const rand = require('./Math/rand')
const round = require('./Math/round')
const smoothstep = require('./Math/smoothstep')

// Workers
// const lazyWorker = require('./Workers/lazy-worker')
// const offlineWorker = require('./Workers/offline-worker')

exports.utils = {
	io,
	mouse,
	raf,
	scroll,
	storage,

	bind,
	debounce,
	getPerformance,
	// lazy,
	prefetch,
	sniffBrowser,
	sniffMobile,

	clamp,
	dist,
	lerp,
	map,
	rand,
	round,
	smoothstep,

	// lazyWorker,
	// offlineWorker
}