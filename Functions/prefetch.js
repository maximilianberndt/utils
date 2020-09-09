// Prefetch subsequent pages

module.exports = (links, prefetchMethod) => {
	
	const supportedPrefetchStrategy = (support('prefetch') && prefetchMethod == "prefetch")
		? linkPrefetchStrategy
		: xhrPrefetchStrategy;

	requestIdleCallback(() => {
		links.forEach(entry => {
			prefetch(entry)
		});
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