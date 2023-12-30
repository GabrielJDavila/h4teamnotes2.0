// self.addEventListener('install', (event) => {
//     event.waitUntil(
//         caches.open('my-cache-name').then((cache) => {
//             return cache.addAll([
//                 // Add URLs to assets you want to cache here
//                 '/',
//                 '/index.html',
//                 '/src/index.css',
//                 '/src/app.jsx',
//                 '/src/main.jsx',
//                 '/src/firebase.jsx'
//                 // Add more paths to your assets
//             ]);
//         })
//     );
// });