import { useState, useEffect } from 'react';

export default function useNotificaciones() {
  const [permiso, setPermiso] = useState('default');

  useEffect(() => {
    // Verificamos si el navegador soporta la API de notificaciones
    if (!('Notification' in window)) {
      console.warn('Este navegador no soporta notificaciones web.');
      return;
    }
    // Leemos cómo está el permiso actualmente (granted, denied, o default)
    setPermiso(Notification.permission);
  }, []);

  const pedirPermiso = async () => {
    if (!('Notification' in window)) return;
    
    // Le mostramos al usuario el cartelito nativo del sistema
    const resultado = await Notification.requestPermission();
    setPermiso(resultado);
  };

  const enviarNotificacion = (titulo, cuerpo) => {
    if (permiso === 'granted') {
      // Dispara la alerta visual en el sistema operativo
      new Notification(titulo, { body: cuerpo });
    }
  };

  return { permiso, pedirPermiso, enviarNotificacion };
}