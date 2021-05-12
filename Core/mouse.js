import { raf } from "./raf"
import { bind } from "../Functions/bind"
import { lerp } from "../Math/lerp"

export const mouse = {
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

	data: {
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
		if (this.data.isActive) return

		this.data.ease = ease || 0.2;

		bind(this, ['setPos', 'calcSpeed', 'getSpeed', 'getPos']);

		document.addEventListener("mousemove", this.setPos)

		if (speed) this.data.speedFn = raf.add(this.calcSpeed);
	},

	stop: function () {
		if (!this.data.isActive) return

		document.removeEventListener("mousemove", this.setPos)

		// Reomve calcSpeed from rendern queue
		if (this.data.speedFn) this.data.speedFn = raf.remove(this.data.speedFn);
	},

	setPos: function () {
		this.hasMoved = true;
		this.pos = {
			x: event.clientX,
			y: event.clientY
		}
	},

	calcSpeed: function () {
		this.last.x = lerp(this.last.x, this.pos.x, this.data.ease);
		this.last.y = lerp(this.last.y, this.pos.y, this.data.ease);

		if (this.last.x < .1) this.last.x = 0;
		if (this.last.y < .1) this.last.y = 0;

		this.speed = (this.pos.x - this.last.x + this.pos.y - this.last.y) / 2;
	}
}