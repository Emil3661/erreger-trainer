// Haelt die Seite offline verfuegbar: erst das Netz, damit neue Staende ankommen,
// ohne Netz die zuletzt gespeicherte Fassung.
const ABLAGE = 'erreger-trainer';

self.addEventListener('fetch', (ereignis) => {
  if (ereignis.request.method !== 'GET') return;
  ereignis.respondWith(
    fetch(ereignis.request)
      .then((antwort) => {
        // Nur erfolgreiche Antworten ersetzen die gespeicherte Fassung.
        if (antwort.ok) {
          const kopie = antwort.clone();
          caches.open(ABLAGE).then((ablage) => ablage.put(ereignis.request, kopie));
        }
        return antwort;
      })
      .catch(() => caches.match(ereignis.request)),
  );
});
