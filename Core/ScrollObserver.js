/*************************************
*
*    Observe Scroll Position
*
*	// Start observing the client scroll Position
*	// Can be called many times and will only register one event listener
*	// Scroll.start()
*	//
* 	// OPTIONAL: track speed and set custom ease (higher ease, more damping)
*	Scroll.start(true, 0.4)
*
*	// Stop observing the scroll Position
* 	// If observe has been called multiple times, scroll observing will not stop
*	Scroll.stop()
*
*	// Returns current scroll Position
*	Scroll.pos
*
*************************************/

module.exports = {
	pos: 0,
	last: 0,
	speed: 0,
	percent: 0, //Value between 0 - 1 

	_data: {
		speedFn: null,
		ease: 0.2,
		isActive: false,
		max: Number(document.body.clientHeight) - Number(document.documentElement.clientHeight)
	},

	getPos() {
		return this.pos;
	},

	getPercent() {
		return this.percent;
	},

	getSpeed() {
		return this.speed;
	},

	start: function (speed, ease) {
		if (this._data.isActive) return

		// Add csutom ease or 0.2 ease
		this._data.ease = ease || 0.2;

		// Bind functions and register event listeners
		require("../Functions/bind")(this, ['_setScroll', '_calcSpeed', '_calcPercent', 'getPos', 'getPercent', 'getSpeed',]);
		window.addEventListener("scroll", this._setScroll, false);

		// OPTIONAL: Calculate Scroll speed
		if (speed) this._data.speedFn = utils.raf.add(this._calcSpeed);
	},

	stop: function () {
		if (!this._data.isActive) return

		// Reomve event listener
		window.removeEventListener("scroll", this._setScroll, false);

		// Reomve _calcSpeed from rendern queue
		if (this._data.speedFn) this._data.speedFn = utils.raf.remove(this._data.speedFn);
	},

	_setScroll: function () {
		this.pos = window.scrollY;
		this._calcPercent();
	},

	_calcSpeed: function () {
		this.last = utils.lerp(this.last, this.pos, this._data.ease)
		if (this.last < .1) this.last = 0;

		this.speed = this.pos - this.last;
	},

	_calcPercent: function () {
		let pct = this.pos / this._data.max;
		this.percent = require("../Math/clamp")(require("../Math/round")(pct, 10000), 0, 1);
	}
}