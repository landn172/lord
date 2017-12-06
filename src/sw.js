importScripts('workbox-sw.prod.js')

const workboxSW = new WorkboxSW({ clientsClaim: true });

const networkFirst = workboxSW.strategies.networkFirst();
workboxSW.router.registerRoute('/', networkFirst);

workboxSW.precache([]);
