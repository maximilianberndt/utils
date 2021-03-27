export const raf = {
	data: {
		raf: undefined,
		isRunning: false,
	},

	renderQueue: [],
	renderQueueL: 0,

	add: function (fn) {
		if (!fn) return

		let newFn = {
			id: Date.now(),
			fn
		}

		// Add to render loop
		this.renderQueue.push(newFn);

		// Update Render queue length
		this.renderQueueL = this.renderQueue.length;

		// Start raf if it's not running yet
		if (!this.data.isRunning) this.start();

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
		if (this.data.isRunning && this.renderQueueL === 0) this.stop();
	},

	start: function () {
		this.data.isRunning = true;
		this.render();
	},

	stop: function () {
		this.data.isRunning = false;
		window.cancelAnimationFrame(this.data.raf);
	},

	render: function () {
		// Execute all functions
		for (let i = this.renderQueueL - 1; i >= 0; i--) {
			this.renderQueue[i].fn()
		}

		// request another frame
		this.data.raf = window.requestAnimationFrame(() => { this.render() });
	}
}
