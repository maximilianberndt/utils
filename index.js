const clamp = require('./Math/clamp')
const dist = require('./Math/dist')
const lerp = require('./Math/lerp')
const map = require('./Math/map')
const rand = require('./Math/rand')
const smoothstep = require('./Math/smoothstep')

const bind = require('./Functions/bind')
const debounce = require('./Functions/debounce')

const IO = require('./Core/IO')
const storage = require('./Core/storage')
// const raf = require('./Core/raf')
// const storage = require('./Core/storage')

exports.utils = {
	clamp,
	dist,
	lerp,
	map,
	rand,
	smoothstep,

	bind,
	debounce,

	IO,
	storage
	// raf,
	// storage
}