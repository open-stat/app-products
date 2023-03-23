const CACHE_NAME     = 'v1';
const APP_APIKEY     = '6A24F3AFD2FFEADEC2756592831D5696C37A6950';
const includeToCache = [
    'manifest.json',
    'index.html',

    'assets/dist/app-all.min.css',
    'assets/dist/app-all.min.js',

    'assets/fonts/MaterialIcons-Regular.eot',
    'assets/fonts/MaterialIcons-Regular.ttf',
    'assets/fonts/MaterialIcons-Regular.woff',
    'assets/fonts/MaterialIcons-Regular.woff2',

    '/assets/img/favicon.ico',
    '/assets/img/favicon144.png',
    '/assets/img/favicon64.png',
    '/assets/img/favicon32.png'
];




// Запуск сервис-воркера и кеширование всего содержимого приложения
self.addEventListener('install', e => {

    // не ждать обновления кэша
    self.skipWaiting();

    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(includeToCache);
        })
    );
});


// Активация
self.addEventListener('activate', event => {

    self.clients.claim();

    // удалите все кеши, которых нет в cacheName который избавится от версии
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (CACHE_NAME !== key) {
                    return caches.delete(key);
                }
            })
        )).then(() => {
            console.log(CACHE_NAME + ' now ready to handle fetches!');
        })
    );
});


// Просматривает все запросы
self.addEventListener('fetch', e => {

    // Добавление авторизапции к запросам
    if (e.request.url.toLowerCase().indexOf('/api/') >= 0) {

        // e.respondWith(async function() {
        //     let modifiedHeaders = new Headers(e.request.headers);
        //     modifiedHeaders.set('Core2-Apikey', APP_APIKEY);
        //
        //     const newRequest = new Request(e.request, {
        //         method: e.request.method,
        //         headers: modifiedHeaders,
        //         mode: 'same-origin',
        //         credentials: e.request.credentials,
        //         redirect: 'manual'
        //     })
        //
        //     return fetch(newRequest);
        // }());

    } else {
        // если сервер ничего не вернул, то берем из кэша
        // ЗАКОММЕНТИРОВАТЬ ЭТОТ БЛОК ДЛЯ РАЗРАБОТКИ
        // e.respondWith(
        //     caches.match(e.request).then(response => {
        //         return response || fetch(e.request);
        //     })
        // );
    }
});
