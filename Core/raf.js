module.exports = {
	_data: {
		raf: undefined,
		isRunning: false,
	},

	renderQueue: [],
	renderQueueL: 0,

	add: function (fn) {
		if (!fn) return

		let newFn = {
			id: Math.round(require('../Math/rand')(1, 99999999)),
			fn
		}

		// Add to render loop
		this.renderQueue.push(newFn);

		// Update Render queue length
		this.renderQueueL = this.renderQueue.length;

		// Start raf if it's not running yet
		if (!this._data.isRunning) this._start();

		// Return the id so function can be removed later
		return (newFn.id);
	},

	remove: function (id) {
		if (!id) return

		for (let i = 0; i < this.renderQueueL; i++) {
			if (this.renderQueue[i].id === id) {

				this.renderQueue.splice(i, 1);

				break
			}
		}

		// Update Render queue length
		this.renderQueueL = this.renderQueue.length;

		// Stop raf 
		if (this._data.isRunning && this.renderQueueL === 0) this._stop();
	},

	_start: function () {
		this._data.isRunning = true;
		this.render();
	},


	_stop: function () {
		this._data.isRunning = false;
		window.cancelAnimationFrame(this._data.raf);
	},

	render: function () {
		// Execute all functions
		let i = this.renderQueue;
		for (i - 1; i >= 0; i--) {
			this.renderQueue[i].fn()
		}

		// request another frame
		this._data.raf = window.requestAnimationFrame(() => { this.render() });
	}
}
