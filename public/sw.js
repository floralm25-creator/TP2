
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    self.clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then((clientes) => {
      for (const cliente of clientes) {
        if ('focus' in cliente) {
          return cliente.focus();
        }
      }

      return self.clients.openWindow('/creaciones');
    })
  );
});
