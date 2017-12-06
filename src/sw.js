importScripts('workbox-sw.prod.js')

const workboxSW = new WorkboxSW({ clientsClaim: true });

const networkFirst = workboxSW.strategies.networkFirst();
const cacheFirst = workboxSW.strategies.cacheFirst()
workboxSW.router.registerRoute('/*', (args) => {
  if (args.event.request.mode !== 'navigate') {
    return cacheFirst.handle(args);
  }
  // if it is a navigation request to a new page
  return networkFirst.handle(args);
});

workboxSW.precache([]);
