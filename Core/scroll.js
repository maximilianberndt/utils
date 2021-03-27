import { bind } from "../Math/bind"
import { clamp } from "../Math/clamp"
import { round } from "../Math/round"
import { raf } from "./raf"

export const scroll = {
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

	start: function (speed, ease) {
		if (this._data.isActive) return

		// Add csutom ease or 0.2 ease
		this._data.ease = ease || 0.2;

		// Bind functions and register event listeners
		bind(this, ['setScroll', 'calcSpeed', 'calcPercent', 'getPos', 'getPercent', 'getSpeed',]);
		window.addEventListener("scroll", this.setScroll, false);

		// OPTIONAL: Calculate Scroll speed
		if (speed) this._data.speedFn = raf.add(this.calcSpeed);
	},

	stop: function () {
		if (!this._data.isActive) return

		// Reomve event listener
		window.removeEventListener("scroll", this.setScroll, false);

		// Reomve calcSpeed from rendern queue
		if (this._data.speedFn) this._data.speedFn = raf.remove(this._data.speedFn);
	},

	setScroll: function () {
		this.pos = window.scrollY;
		this.calcPercent();
	},

	calcSpeed: function () {
		this.last = utils.lerp(this.last, this.pos, this._data.ease)
		if (this.last < .1) this.last = 0;

		this.speed = this.pos - this.last;
	},

	calcPercent: function () {
		let pct = this.pos / this._data.max;
		this.percent = clamp(round(pct, 10000), 0, 1);
	}
}