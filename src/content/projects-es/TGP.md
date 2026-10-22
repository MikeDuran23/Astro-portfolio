---
title: "The Gamer's Place"
description: "Una aplicación web full-stack creada como mi Trabajo de Fin de Grado. Ayuda a los usuarios a llevar el registro de los juegos que han jugado, descubrir nuevos títulos con un sistema de recomendación personalizado y gestionar su biblioteca personal de videojuegos."
---

# The Gamer's Place

## ¿Qué es?

**The Gamer's Place** es una aplicación web full-stack creada para mi Trabajo de Fin de Grado en Ingeniería Informática. Es una plataforma pensada para resolver un problema real de la industria del videojuego: con miles de juegos lanzados cada año en múltiples plataformas, es casi imposible descubrir títulos realmente buenos que encajen con tus intereses.

Piénsalo como **tu curador personal de videojuegos**. Organiza tu biblioteca, lleva el registro de lo que has jugado, escribe y lee reseñas, compara juegos y descubre recomendaciones personalizadas, todo en un mismo sitio.

---

## El problema que resolvemos

**Por qué existe este proyecto:**

- **Demasiados juegos, muy poco tiempo** – Solo Steam lanza miles de juegos al año y muchos pasan desapercibidos
- **Malas recomendaciones** – La mayoría de plataformas priorizan los éxitos comerciales frente al descubrimiento real
- **Sin un punto central** – Necesitas varias apps para gestionar listas de deseos, favoritos e información de juegos
- **Saturación de juegos indie** – Juegos indie brillantes quedan enterrados porque no tienen presupuesto de marketing
- **El dilema del descubridor** – ¿Cómo encuentras tu próximo juego favorito sin hacer scroll sin fin?

Este proyecto nació de la convicción de que **los jugadores merecen mejores herramientas para descubrir juegos que de verdad les encantarán**.

---

## Funcionalidades principales

- **Autenticación segura** – Regístrate e inicia sesión para acceder a las funciones personalizadas
- **Biblioteca personal** – Organiza los juegos en favoritos, jugados y listas personalizadas
- **Catálogo extenso** – Explora más de 10.000 juegos reales con información detallada
- **Búsqueda y filtros avanzados** – Encuentra juegos por género, plataforma, año, valoración y más
- **Recomendaciones inteligentes** – Sugerencias personalizadas según tus preferencias y tu estado de ánimo
- **Comparador de juegos** – Compara dos juegos lado a lado para decidir más fácilmente
- **Reseñas de usuarios** – Escribe y lee reseñas con valoraciones y opiniones de la comunidad
- **Listas personalizadas** – Crea colecciones de juegos públicas o privadas con categorías con sentido
- **Perfiles de usuario** – Muestra a la comunidad tu historial de juego y tus listas
- **Panel de administración** – Herramientas de moderación para mantener una comunidad segura y de calidad

---

## Recorrido por las funciones

### Registro e inicio de sesión
<video controls preload="metadata" playsinline>
  <source src="/auth.mp4" type="video/mp4" controls muted>
  Tu navegador no admite vídeo HTML5.
</video>

Sistema de autenticación seguro construido con Spring Security y tokens JWT. Crea una cuenta o inicia sesión para acceder a tu espacio personalizado de videojuegos. Tus datos están cifrados y protegidos.

---

### Página de inicio
<video controls preload="metadata" playsinline>
  <source src="/home.mp4" type="video/mp4" controls muted>
  Tu navegador no admite vídeo HTML5.
</video>

Tu punto de entrada a la plataforma. Consulta los últimos lanzamientos, los juegos mejor valorados, los títulos destacados y los accesos rápidos a las secciones clave: el catálogo completo, las recomendaciones personalizadas y tu perfil. La barra de navegación deja todo a un solo clic.

---

### Catálogo de juegos con filtros avanzados
<video controls preload="metadata" playsinline>
  <source src="/catalog.mp4" type="video/mp4" controls muted>
  Tu navegador no admite vídeo HTML5.
</video>

Explora nuestra colección de más de 10.000 juegos con paginación y potentes filtros:
- Busca por nombre del juego
- Filtra por género, plataforma, año de lanzamiento y valoración
- Ordena por valoración, fecha de lanzamiento y popularidad
- Añade juegos a favoritos al instante

La interfaz está pensada para la rapidez y la exploración intuitiva: sin scroll infinito, solo descubrimiento inteligente.

---

### Detalle del juego y gestión de la biblioteca
<video controls preload="metadata" playsinline>
  <source src="/details.mp4" type="video/mp4" controls muted>
  Tu navegador no admite vídeo HTML5.
</video>

Cada juego tiene una página propia llena de información:
- Descripción completa y metadatos del juego
- Plataformas y tiendas compatibles
- Géneros, valoraciones y reseñas
- Carrusel de capturas de pantalla
- Año y detalles de lanzamiento

Desde aquí puedes:
- **Añadir o quitar de favoritos** – Marca los juegos que te encantan
- **Marcar como jugado** – Lleva el control de lo que has completado
- **Crear listas personalizadas** – Añade el juego a colecciones propias al momento
- **Escribir reseñas** – Valora y comenta en público, o valora solo en privado
- **Leer las reseñas de la comunidad** – Mira qué opinan otros jugadores

---

### Comparador de juegos
<video controls preload="metadata" playsinline>
  <source src="/compare.mp4" type="video/mp4" controls muted>
  Tu navegador no admite vídeo HTML5.
</video>

¿Dudas entre dos juegos? Usa el comparador para verlos lado a lado:
- Compara plataformas, géneros, valoraciones y precios
- El diseño visual deja las diferencias claras al instante
- Toma decisiones informadas en segundos

Es una de las funciones más singulares de la plataforma: la mayoría de las webs de videojuegos no ofrecen este nivel de comparación.

---

### Perfil de usuario y listas
<video controls preload="metadata" playsinline>
  <source src="/profile.mp4" type="video/mp4" controls muted>
  Tu navegador no admite vídeo HTML5.
</video>

Tu panel de jugador. Verás de un vistazo:
- **Tus favoritos** – Los juegos que te encantan (visibles públicamente)
- **Juegos jugados** – Tu historial de juegos completados (visible públicamente)
- **Listas personalizadas** – Las colecciones que has creado (a elegir públicas o privadas)
- **Tus reseñas** – Todos los comentarios y valoraciones que has publicado
- **Estadísticas personales** – Juegos jugados, horas invertidas, logros

Edita tu perfil, personaliza la visibilidad de tus listas y gestiona tu identidad de jugador.

---

### Sistema de recomendación personalizado
<video controls preload="metadata" playsinline>
  <source src="/recom.mp4" type="video/mp4" controls muted>
  Tu navegador no admite vídeo HTML5.
</video>

Este es el **corazón de la plataforma**. En lugar de mostrar sugerencias al azar, el motor de recomendación funciona así:

1. **Encuesta interactiva de preferencias** – Elige tu favorito entre 10 parejas de juegos (justo lo que te apetece ahora mismo)
2. **Análisis inteligente** – El sistema combina:
   - Tus elecciones actuales
   - Tus preferencias generales
   - Los juegos que te han encantado en el pasado
   - Tus afinidades por género
3. **Resultados personalizados** – Recibe 10 recomendaciones a tu medida
4. **Guardar como lista** – Convierte las recomendaciones en una lista personalizada al instante

Lo mejor: **las recomendaciones cambian según tu estado de ánimo**. La próxima vez que lo uses puedes obtener sugerencias distintas, según lo que elijas.

---

## Arquitectura técnica

### Por qué importa

Construir esto no era solo cuestión de una interfaz bonita: se trata de **ingeniería sólida**:

**Frontend (Vue.js)**
- Interfaz reactiva y moderna que responde al instante a las acciones del usuario
- Arquitectura basada en componentes para la reutilización y el mantenimiento
- Diseño responsive que funciona sin problemas en móvil, tablet y escritorio

**Backend (Spring Boot + Java)**
- APIs REST y GraphQL para una comunicación cliente-servidor flexible
- Autenticación basada en JWT para sesiones seguras y sin estado
- Estructura de código modular que sigue los principios de arquitectura limpia
- Control de acceso basado en roles (usuarios, administradores, moderadores)

**Base de datos (MongoDB)**
- Estructura NoSQL perfecta para datos de videojuegos complejos (múltiples plataformas, géneros y valoraciones por juego)
- Esquema flexible que evoluciona con las nuevas funcionalidades
- Consultas indexadas para búsquedas rápidas entre más de 10.000 juegos

**Pipeline de datos**
- Integración con la API de RAWG.io (unos 500.000 juegos disponibles)
- Scripts propios en Python para la extracción y limpieza de datos
- Filtrado inteligente para seleccionar los juegos y metadatos relevantes
- Copias de seguridad persistentes en JSON para garantizar la integridad de los datos

---

## El desarrollo (7 sprints)

Seguí la **metodología Scrum** para gestionar este proyecto íntegramente en solitario:

| Sprint | Duración | Enfoque |
|--------|----------|---------|
| **Sprint 1** | 3 semanas | Investigación de tecnologías, evaluación de frameworks, planificación de la arquitectura |
| **Sprint 2** | 3 semanas | Extracción de datos de la API, historias de usuario, prototipos de interfaz en Figma |
| **Sprint 3** | 3 semanas | Base del backend, puesta en marcha del frontend, diseño del esquema de la base de datos |
| **Sprint 4** | 3 semanas | Sistema de autenticación, catálogo inicial, base de datos de usuarios |
| **Sprint 5** | 3 semanas | Búsqueda avanzada, páginas de detalle de juegos, creación de listas personalizadas |
| **Sprint 6** | 3 semanas | Sistema de reseñas de usuarios, herramienta de comparación de juegos |
| **Sprint 7** | 3 semanas | Motor de recomendación visual, panel de administración, últimos retoques |

Herramientas utilizadas: **GitHub** (control de versiones), **Taiga** (gestión del proyecto), **VS Code + IntelliJ** (desarrollo), **Postman** (pruebas de API), **Figma** (diseño).

---

## Lo que aprendí

Fue una experiencia de aprendizaje full-stack completa:

**Dominio del backend**
- Diseño de APIs REST y GraphQL para una obtención de datos optimizada
- Spring Security y el flujo de autenticación con JWT
- Diseño de bases de datos para relaciones complejas
- Optimización de consultas para búsquedas entre más de 10.000 juegos
- Autorización para administradores y basada en roles

**Excelencia en el frontend**
- Gestión de estado y patrones reactivos en Vue.js
- Construcción de interfaces responsive y accesibles
- Composición y reutilización de componentes

**Algoritmos de recomendación**
- Lógica de coincidencia de preferencias
- Sistemas de ponderación para factores diversos
- Personalización más allá del simple "a quienes les gusta X también les gusta Y"

**Integración full-stack**
- Patrones de comunicación entre frontend y backend
- Gestión de errores y degradación elegante
- Diseño de arquitecturas escalables

**Prácticas profesionales**
- Ceremonias de Scrum y ciclos de sprint
- Revisiones de código y principios de código limpio
- Documentación técnica
- Buenas prácticas de control de versiones

---

## Qué hace diferente a este proyecto

1. **Descubrimiento genuino** – No está optimizado para vender; está optimizado para lo que *tú* quieres jugar de verdad
2. **Comparador visual** – Una función poco habitual que ayuda a resolver la parálisis de decisión
3. **Recomendaciones según el ánimo** – Tus sugerencias cambian según tus preferencias del momento, no solo según tu historial
4. **Reseñas de la comunidad** – Opiniones reales de jugadores, no solo puntuaciones agregadas
5. **Supervisión de administración** – Las herramientas de moderación mantienen sana a la comunidad
6. **Diseño escalable** – Construido desde cero para crecer hasta convertirse en una plataforma real

---

## Stack técnico

- **Frontend:** Vue.js (reactivo, basado en componentes)
- **Backend:** Java + Spring Boot (REST + GraphQL)
- **Base de datos:** MongoDB (flexible, escalable)
- **Autenticación:** Spring Security + JWT
- **Fuente de datos:** API de RAWG.io + pipeline ETL propio
- **Gestión del proyecto:** Scrum (7 sprints, 21 semanas)
- **Control de versiones:** GitHub

---

## Mejoras futuras

La plataforma está lista para producción, pero siempre hay margen para crecer:

- **Funciones sociales** – Listas de amigos, feeds de actividad, listas compartidas
- **Integración con plataformas** – Importación automática de tu biblioteca de Steam o PlayStation
- **Mejores recomendaciones** – Aprendizaje automático y filtrado colaborativo
- **Logros y trofeos** – Gamificar la propia plataforma
- **App móvil** – Experiencias nativas para iOS y Android
- **Perfiles 2.0** – Estadísticas, logros y temas personalizables
- **Espacios de comunidad** – Foros de discusión y clubes de juegos
- **Integración con streaming** – Ver directos de los juegos que te interesan

---

## Consigue el código

**GitHub:** [github.com/MiguelDuranAltes/TheGamersPlace](https://github.com/MiguelDuranAltes/TheGamersPlace)

El código fuente completo es público. ¡Siéntete libre de explorarlo, hacer un fork o usarlo como referencia para tus propios proyectos!

---

## Impacto

Este proyecto representa un logro importante en mi camino como desarrollador. No es solo un requisito del trabajo de fin de grado: es una plataforma completa y funcional que resuelve un problema real para jugadores de todo el mundo. Demuestra mi capacidad para diseñar, estructurar, construir y desplegar una aplicación full-stack compleja **desde cero**, siguiendo prácticas de desarrollo profesionales.

Si estás contratando, este es el tipo de trabajo que hago: meditado, centrado en el usuario, técnicamente sólido y escalable.
