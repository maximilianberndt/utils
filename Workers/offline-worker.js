// Offline Fallback
// https://github.com/mozilla/serviceworker-cookbook/blob/master/offline-fallback/service-worker.js


self.addEventListener('install', function (event) {
	// Put `index.html` page into cache
	var offlineRequest = new Request('index.html');
	
	event.waitUntil(
		fetch(offlineRequest).then(function (response) {
			return caches.open('offline').then(function (cache) {
				// console.log('[oninstall] Cached offline page', response.url);
				return cache.put(offlineRequest, response);
			});
		})
	);
});

self.addEventListener('fetch', function (event) {
	// Only fall back for HTML documents.
	var request = event.request;
	// && request.headers.get('accept').includes('text/html')
	if (request.method === 'GET') {
		// `fetch()` will use the cache when possible, to this examples
		// depends on cache-busting URL parameter to avoid the cache.
		event.respondWith(
			fetch(request).catch(function (error) {
				// `fetch()` throws an exception when the server is unreachable but not
				// for valid HTTP responses, even `4xx` or `5xx` range.
				console.error(
					'[onfetch] Failed. Serving cached offline fallback ' +
					error
				);
				return caches.open('offline').then(function (cache) {
					return cache.match('index.html');
				});
			})
		);
	}
	// Any other handlers come here. Without calls to `event.respondWith()` the
	// request will be handled without the ServiceWorker.
});