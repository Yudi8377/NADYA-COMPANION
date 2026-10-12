const CACHE = 'nadya-shell-v9';
const SHELL = ['./', './index.html', './styles.css', './manifest.webmanifest', './icon.svg', './src/config.js', './src/app.js', './src/core/runtime.js', './src/core/capabilities.js', './src/core/memory.js', './src/core/orchestrator.js', './src/core/provider.js', './src/core/chat-contract.js', './src/core/knowledge.js', './src/core/additional-knowledge.js'];
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)));
  self.skipWaiting();
});
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))));
  self.clients.claim();
});
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(fetch(event.request).then((response) => {
    if (response.ok && response.type === 'basic') { const copy = response.clone(); caches.open(CACHE).then((cache) => cache.put(event.request, copy)); }
    return response;
  }).catch(() => caches.match(event.request)));
});
