
import { useState, useEffect } from 'react';

export default function useNotificaciones() {
  const [permiso, setPermiso] = useState('default');

  useEffect(() => {
    if (!('Notification' in window)) {
      console.warn('Este navegador no soporta notificaciones.');
      return;
    }

    setPermiso(Notification.permission);

    // Registramos el Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(() => {
          console.log('Service Worker registrado correctamente');
        })
        .catch((error) => {
          console.error('Error al registrar Service Worker:', error);
        });
    }
  }, []);

  const pedirPermiso = async () => {
    if (!('Notification' in window)) return;

    const resultado = await Notification.requestPermission();
    setPermiso(resultado);
  };

  const enviarNotificacion = async (titulo, cuerpo) => {
    // Consultamos el permiso actualizado
    if (!('Notification' in window) ||
        Notification.permission !== 'granted') {
      return;
    }

    try {
      const registro = await navigator.serviceWorker.ready;

      await registro.showNotification(titulo, {
        body: cuerpo
      });

    } catch (error) {
      console.error('Error al mostrar la notificación:', error);
    }
  };

  return { permiso, pedirPermiso, enviarNotificacion };
}
