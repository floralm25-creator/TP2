import { useState, useEffect } from 'react';

export default function useFavoritos() {
  const [favoritos, setFavoritos] = useState(() => {
    const favoritosGuardados = localStorage.getItem('rick_and_morty_favoritos');
    return favoritosGuardados ? JSON.parse(favoritosGuardados) : [];
  });

  
  useEffect(() => {
    const sincronizarEstados = () => {
      const actualizados = localStorage.getItem('rick_and_morty_favoritos');
      setFavoritos(actualizados ? JSON.parse(actualizados) : []);
    };

    
    window.addEventListener('favoritos_actualizados', sincronizarEstados);

    
    return () => window.removeEventListener('favoritos_actualizados', sincronizarEstados);
  }, []);

  const alternarFavorito = (personaje) => {
    
    const guardados = JSON.parse(localStorage.getItem('rick_and_morty_favoritos')) || [];
    const yaExiste = guardados.some((fav) => fav.id === personaje.id);
    
    let nuevaLista;
    if (yaExiste) {
      nuevaLista = guardados.filter((fav) => fav.id !== personaje.id);
    } else {
      nuevaLista = [...guardados, personaje];
    }
   
    localStorage.setItem('rick_and_morty_favoritos', JSON.stringify(nuevaLista));
    
    setFavoritos(nuevaLista);

    window.dispatchEvent(new Event('favoritos_actualizados'));
  };

  const esFavorito = (id) => {
    return favoritos.some((fav) => fav.id === id);
  };

  return { favoritos, alternarFavorito, esFavorito };
}