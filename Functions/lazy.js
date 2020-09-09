//Lazy load assets using a service worker

module.exports = {
	load: (selector = ".lazy") => {
		 let els = document.querySelectorAll(`${selector}`)
		 let elsL = els.length;

		 for (let i = 0; i < elsL; i++) {
				const url = els[i].getAttribute('data-src')
				if (url) lazy.worker.postMessage(url)
		 }
	},

	worker: new Worker('./lazy.worker.js'),

	i: (() => {
		 setTimeout(function () {
				lazy.worker.addEventListener('message', event => {
					 // Grab the message data from the event
					 const data = event.data

					 if (!data) return

					 // Get the original element for this image
					 const img = document.querySelector(`img[data-src='${data.url}']`)

					 if (!img) return

					 // We can use the `Blob` as an image source! We just need to convert it
					 // to an object URL first
					 const objectUrl = URL.createObjectURL(data.blob)
					 img.setAttribute('src', objectUrl)

					 // Let's remove the original `data-src` attribute to make sure we don't
					 // accidentally pass this image to the worker again in the future
					 img.removeAttribute('data-src');
				})
		 }, 0);
	})()
}