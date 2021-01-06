/*************************************
*
*    Observe Mouse Position
*
*	// Start observing the client mouse Position
*	// Can be called many times and will only register one event listener
*	// Mouse.start()
*	//
* 	// OPTIONAL: track speed and set custom ease (higher ease, more damping)
*	Mouse.start(true, 0.4)
*
*	// Stop observing the mouse Position
* 	// If observe has been called multiple times, scroll observing will not stop
*	Mouse.stop()
*
*	// Returns current mouse Position
*	// { x: 23, y: 234 }
*	Mouse.getPos
*
*************************************/

module.exports = {
	pos: {
		x: 0,
		y: 0
	},
	last: {
		x: 0,
		y: 0
	},
	speed: 0,
	hasMoved: false,

	_data: {
		speedFn: null,
		ease: 0.2,
		isActive: false,
	},

	getPos() {
		return this.pos
	},

	getSpeed() {
		return this.speed
	},

	start: function (speed, ease) {
		if (this._data.isActive) return

		this._data.ease = ease || 0.2;

		require("../Functions/bind")(this, ['_setPos', '_calcSpeed', 'getSpeed', 'getPos']);

		document.addEventListener("mousemove", this._setPos)

		if (speed) this._data.speedFn = require("./raf").add(this._calcSpeed);
	},

	stop: function () {
		if (!this._data.isActive) return

		document.removeEventListener("mousemove", this._setPos)

		// Reomve _calcSpeed from rendern queue
		if (this._data.speedFn) this._data.speedFn = require("./raf").remove(this._data.speedFn);
	},

	_setPos: function () {
		this.hasMoved = true;
		this.pos = {
			x: event.clientX,
			y: event.clientY
		}
	},

	_calcSpeed: function () {
		this.last.x = require("../Math/lerp")(this.last.x, this.pos.x, this._data.ease);
		this.last.y = require("../Math/lerp")(this.last.y, this.pos.y, this._data.ease);

		if (this.last.x < .1) this.last.x = 0;
		if (this.last.y < .1) this.last.y = 0;

		this.speed = (this.pos.x - this.last.x + this.pos.y - this.last.y) / 2;
	}
}