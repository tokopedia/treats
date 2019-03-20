workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.routing.registerRoute(
    new RegExp("http://www.test.com"),
    new workbox.strategies.StaleWhileRevalidate()
);

workbox.precaching.precacheAndRoute(self.__precacheManifest);