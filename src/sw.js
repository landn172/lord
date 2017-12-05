importScripts('./dist/workbox-sw.prod.js')

const workboxSW = new WorkboxSW({ clientsClaim: true });

workboxSW.precache([]);
