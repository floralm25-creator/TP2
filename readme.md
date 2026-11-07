# TP Integrador – Rick and Morty

## Descripción
Aplicación web desarrollada con React y Vite que permite consultar personajes de Rick and Morty, registrarse, iniciar sesión y crear, editar y eliminar personajes propios dentro de una comunidad.

## Servicio y opción elegida
Se eligió **Supabase** como servicio backend, utilizando:
- **Authentication:** registro e inicio de sesión de usuarios.
- **Database:** almacenamiento de los personajes creados.
- **Storage:** almacenamiento de imágenes.
- **Realtime:** actualización de la comunidad en tiempo real.

También se utiliza la API pública de [Rick and Morty](https://rickandmortyapi.com/) para consultar los personajes originales.

## Cómo instalar y ejecutar el proyecto

1. Clonar el repositorio:
   
   git clone https://github.com/floralm25-creator/TP2.git
  

2. Ingresar a la carpeta del proyecto:
   
   cd NOMBRE_DEL_PROYECTO
   

3. Instalar las dependencias:

   npm install


4. Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

  
   VITE_SUPABASE_URL=https://frcpmyidghbrsmbpwpsg.supabase.co
   VITE_SUPABASE_ANON_KEY=sb_publishable_l8Dsq_orTJTfJYoQsfZlHA_DTvBZtJh
   VITE_API_URL=https://rickandmortyapi.com/api
  

5. Iniciar el servidor de desarrollo:
  
   npm run dev
   

## API del teléfono
Se utiliza la **Notifications API**, junto con un Service Worker, para mostrar notificaciones cuando otro usuario crea o modifica un personaje en la comunidad. Se solicita el permiso correspondiente al usuario y se informa cuando no está concedido.

## Usuarios de prueba

- **Usuario1:** [pepe@prueba.com] – [999888]
- **Usuario 2:** [javier@prueba.com] – [222333]

## Cómo probar las notificaciones desde un celular
Se recomienda utilizar un dispositivo Android con Google Chrome.

Ingresar a https://tp-2-neon.vercel.app/

Iniciar sesión con uno de los usuarios de prueba.

Ingresar a la sección Comunidad.

Activar las notificaciones y aceptar el permiso solicitado por el navegador.

Mantener la aplicación abierta y conectada.

Desde otro dispositivo o navegador, iniciar sesión con el segundo usuario y crear o modificar un personaje.

##comentarios
Se utilizo la inteligencia artificial para el desarrollo de las notifiaciones, la seccion registro y los estilos.