const cacheData = 'tarea-react-v1';

const assets = [
    '/',
    'index.html',
    '/static/js/bundle.js',
    '/pokemon/:name',
    'default.jpg'

]
this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll(assets)
        })
    )
})

this.addEventListener('fetch', (event) => {
    if(!navigator.onLine) {
        event.respondWith(
            caches.match(event.request).then((resp) => {
                if(resp) {
                    return resp
                }
                let requestUrl = event.request.clone()
                fetch (requestUrl)
            })
        )
    }
})