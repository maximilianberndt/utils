// Prefetch subsequent pages
// TODO: Dom parse and select preload critical images

module.exports = (links, prefetchMethod) => {

	const supportedPrefetchStrategy = (support('prefetch') && prefetchMethod == "prefetch")
		? linkPrefetchStrategy
		: xhrPrefetchStrategy;

	const linksL = links.length;

	requestIdleCallback(() => {
		for(let i = 0; i < linksL; i++) {
			prefetch(links[i])
		}
	}, { timeout: 23 });

	/** prefetches a resource by using link[rel="prefetch"]
	* It creates a link element and appends attributes: rel="prefetch" and href with the url param as the value.
	*/
	function linkPrefetchStrategy(url) {
		return new Promise((resolve, reject) => {
			const link = document.createElement(`link`);
			link.rel = `prefetch`;
			link.href = url;
			link.onload = resolve;
			link.onerror = reject;
			document.head.appendChild(link);
		});
	};

	/** prefetches a resource using XHR */
	function xhrPrefetchStrategy(url) {
		return new Promise((resolve, reject) => {
			const req = new XMLHttpRequest();
			req.open(`GET`, url, req.withCredentials = true);
			req.onload = () => {
				if (req.status === 200) {
					let response = req.response

					// TODO: Dom parse and select preload critical images
					console.log(response)

					resolve()
				} else {
					reject()
				}
			};
			req.send();
		});
	}

	/** checks if your machine supports prefetching using link[rel="prefetch"] */
	function support(feature) {
		const link = document.createElement('link');
		return (link.relList || {}).supports && link
			.relList
			.supports(feature);
	}

	/** prefetches a resource */
	function prefetch(url) {
		url = new URL(url, location.href)
		let conn = navigator.connection;

		if (!conn) return
		if (conn.effectiveType.includes('2g') || conn.saveData) return

		return (supportedPrefetchStrategy)(url).then(() => {
			console.log(` ${url} fetched`)
		}, () => {
			console.log(`${url} not fetched`)
		});
	};
}