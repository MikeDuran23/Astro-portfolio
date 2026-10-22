---
title: "Poustfit"
description: "Una red social de outfits creada en la HackUDC 2025 junto a tres compañeros. Subes una foto de lo que llevas puesto y Poustfit encuentra productos similares del catálogo de Inditex con la API de Visual Search de Inditex Tech."
---

## ¿Qué es?

**Poustfit** es una red social donde la gente comparte sus outfits y puede recrear los looks de otros con productos reales. Publicas una foto de lo que llevas puesto y la página del post muestra prendas similares del catálogo de Inditex, cada una con un enlace a su página de producto.

La creamos durante la **HackUDC 2025** en un equipo de cuatro personas. El reto era construir algo sobre la **API de Visual Search de Inditex Tech**, un endpoint que recibe la URL de una foto y devuelve enlaces a productos similares.

---

## Cómo funciona

La idea es sencilla, pero llevar una foto desde el móvil hasta una lista de productos implica varios servicios:

1. **Publicar.** El usuario elige una foto y un título. El cliente Vue crea el post y después envía la imagen al servidor.
2. **Conseguir una URL pública.** La API de Inditex no acepta un archivo de imagen, solo una URL. Por eso el servidor sube la foto a **ImgBB** y guarda el enlace público que devuelve, junto a su propia copia en disco.
3. **Pedir coincidencias a Inditex.** Cuando alguien abre un post, el servidor se autentica con Inditex mediante OAuth2 (client credentials), llama al endpoint de Visual Search con la URL pública de la foto y devuelve los productos que coinciden.
4. **Explorar los resultados.** Los productos se cargan en páginas de 40 y siguen cargándose según haces scroll.
5. **Previsualizar un producto.** Al pulsar un producto se muestra su foto y un enlace a la página de Inditex. La API no devuelve fotos de producto, así que un navegador de **Playwright** abre la página del producto, captura la imagen y se la envía al cliente.

---

## Funcionalidades

- **Cuentas.** Registro e inicio de sesión, con sesiones gestionadas mediante un JWT guardado en una cookie.
- **Feed.** Un feed paginado con los outfits de todos.
- **Página del outfit.** La foto, el autor, la fecha y el título, junto con la lista en vivo de productos similares de Inditex.
- **Favoritos.** Dale a me gusta a un post para guardarlo y consulta todos tus posts favoritos en un solo sitio.
- **Perfil.** Tu propia página de cuenta con los outfits que has publicado.
- **Rutas protegidas.** Solo las páginas de bienvenida, login y registro son públicas; todo lo demás requiere sesión.

---

## Pantallas

Estos son mockups de diseño de las pantallas principales de la app, reconstruidos a partir del código del cliente. Los outfits, los nombres de usuario y los productos son de ejemplo.

![Pantalla de bienvenida con los botones de Login y Register](/projects/poustfit/welcome.webp)

![Formulario de login](/projects/poustfit/login.webp)

![Formulario de registro con foto de perfil, descripción y campos de contraseña](/projects/poustfit/register.webp)

![Feed de inicio con tarjetas de outfits](/projects/poustfit/home.webp)

![Detalle de un post con la lista de productos similares de Inditex y la vista previa de un producto](/projects/poustfit/details.webp)

![Formulario de publicación con un título y la foto del outfit](/projects/poustfit/publish.webp)

![Mi perfil con los datos de la cuenta y los outfits publicados](/projects/poustfit/profile.webp)

![Mis favoritos](/projects/poustfit/favorites.webp)

---

## Retos

**La API quiere una URL, no un archivo.** Nuestros usuarios suben archivos desde sus dispositivos, pero el endpoint de Visual Search solo acepta un enlace. Lo resolvimos pasando cada subida por la API de ImgBB para obtener una URL pública estable. El código también conserva un cliente de Imgur sin usar, un resto de haber probado otro servicio de alojamiento de imágenes.

**Sin fotos de producto en la respuesta.** La API devuelve nombres y enlaces de productos, pero no imágenes, así que añadimos un paso de scraping con Playwright para obtener la foto del producto desde la página de Inditex cuando el usuario pulsa una prenda.

**Entender la documentación.** Al principio nos costó entender la documentación de la API de Inditex, lo que dejó código confuso en las primeras versiones. Lo ordenamos y seguimos adelante.

---

## Arquitectura

**Frontend: Vue 3 + Vite**
- Componentes agrupados por funcionalidad (inicio, detalle, publicar, perfil, favoritos, login, registro).
- **Pinia** para el estado de autenticación y guards de **Vue Router** que redirigen entre páginas públicas y privadas.
- Componentes de **PrimeVue** con estilos de **Tailwind CSS 4**, **Axios** para las llamadas a la API y **SweetAlert2** para las confirmaciones.

**Backend: Spring Boot 3.4 con Java 21**
- Estructura por capas: controladores, servicios, repositorios y DTOs, con un manejador global de excepciones que devuelve respuestas de error coherentes.
- **Spring Security** en modo stateless con un filtro JWT (jjwt) y CORS configurado para el cliente.
- **Spring Data JPA** con **PostgreSQL** para usuarios, posts y likes.
- Un paquete `remote` independiente para las tres integraciones externas: Inditex (autenticación y búsqueda), ImgBB (alojamiento de imágenes) y Playwright (fotos de producto).

---

## El equipo

Lo construimos entre cuatro, trabajando tanto en el frontend como en el backend: Lucas Kwak, Miguel Marcos Trillo, Lucas Redondo y yo. Nos repartimos el trabajo entre los cuatro y también nos ocupamos de la integración con la API de Inditex y de los demás servicios externos.

---

## Lo que aprendí

- **Trabajar con APIs de terceros.** Usar ImgBB y la API de Inditex nos ahorró muchísimo tiempo frente a construir esas funcionalidades nosotros mismos, y me enseñó a planificar según lo que una API externa puede y no puede hacer.
- **Encadenar servicios.** Una sola acción del usuario toca el navegador, nuestro servidor, ImgBB, Inditex y un navegador de Playwright, así que cada integración tuvo que aislarse y tratarse por separado.
- **Trabajo en equipo en un proyecto full-stack.** Repartir un proyecto entre cuatro con la presión de tiempo de un hackathon, con frontend y backend avanzando en paralelo, y terminar con muy buenos resultados y un gran entendimiento entre nosotros.

---

## Qué mejoraría

- Ejecutar Playwright en modo headless, reutilizar una única instancia del navegador y cachear las fotos de producto en lugar de lanzar un navegador en cada clic.
- Desplegarlo. Hoy se ejecuta en local, con el origen del cliente y las rutas de almacenamiento de imágenes configurados para una máquina de desarrollo.
- Añadir tests de verdad, algo que los plazos del hackathon no permitieron.

---

## Consigue el código

**GitHub:** [github.com/MiguelDuranAltes/Poustfit](https://github.com/MiguelDuranAltes/Poustfit)

El repositorio contiene tanto el cliente Vue como el servidor Spring Boot, y está publicado bajo la licencia Apache 2.0.
