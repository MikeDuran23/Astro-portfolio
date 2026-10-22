---
title: "Nebula"
description: "Un proyecto personal que creé para resolver una necesidad propia: un lugar privado donde guardar mis fotos y vídeos, en mi propio hardware en lugar de en la nube. Una app para iPhone y Android hecha con Expo se comunica con un servidor FastAPI y PostgreSQL en casa, y cada foto se copia a un segundo ordenador. Construirlo me enseñó más que cualquier curso."
---

## ¿Qué es?

**Nebula es un proyecto personal, creado para resolver una necesidad que tenía.** Quería guardar mis fotos y vídeos en un sitio que controlo, en hardware que es mío, en lugar de depender de iCloud.

Es mi propia versión de iCloud Fotos: un portátil en casa hace de servidor y una app móvil (iPhone y Android, con un único código) permite a dos personas hacer copia de seguridad de sus fotos, explorarlas y compartir algunas entre ellas.

Podría haber instalado una solución ya hecha como [Immich](https://immich.app). La construí a mano porque también quería aprender cómo funciona de verdad una app así, desde los índices de la base de datos hasta el gesto de pellizcar para hacer zoom.

---

## Cómo funciona

```
 Móvil (app Expo)           Portátil en casa (Ubuntu)                PC con Windows
┌──────────────┐ Tailscale ┌───────────────────────────────┐ restic ┌──────────────┐
│ Biblioteca   │◄─────────►│ FastAPI ──► PostgreSQL        │───────►│ Copias       │
│ Subida       │ (privada, │    │        (Docker)          │        │ cifradas y   │
│ Ajustes      │  HTTPS)   │    └──────► Disco externo     │        │ con fecha    │
└──────────────┘           │            (fotos y vídeos)   │        └──────────────┘
                           └───────────────────────────────┘
```

- **La app** solo habla con la API, a través de **Tailscale**, una red privada cifrada. Nada queda expuesto a internet.
- **La API** decide quién puede ver qué, guarda cada archivo una sola vez y gestiona la papelera.
- **PostgreSQL** guarda la información *sobre* cada foto; los archivos en sí viven en un **disco duro externo**.
- **restic** copia todo (las fotos y una exportación de la base de datos) a un segundo ordenador como copias cifradas y con fecha, de modo que incluso una foto borrada por error se puede recuperar.

---

## Recorrido por las funciones

### Inicio de sesión y Face ID

<video class="phone" src="/projects/nebula/login.mp4" controls muted loop playsinline preload="metadata" aria-label="Desbloqueando Nebula e iniciando sesión"></video>

Escribes la contraseña una vez; después la app se desbloquea con Face ID y se bloquea sola tras 5 minutos en segundo plano. No hay registro: las cuentas se crean en el servidor.

### La biblioteca

<video class="phone" src="/projects/nebula/library.mp4" controls muted loop playsinline preload="metadata" aria-label="Desplazándose por la biblioteca, cambiando de columnas y saltando entre meses con el deslizador"></video>

Todas las fotos, de la más reciente a la más antigua, agrupadas por mes. Pellizca para cambiar entre 1, 3, 5 y 9 columnas, filtra por **Todas / Mías / Compartidas** y arrastra el deslizador de la derecha para saltar al instante a cualquier mes, incluso con decenas de miles de fotos.

<video class="phone" src="/projects/nebula/filters.mp4" controls muted loop playsinline preload="metadata" aria-label="Filtrando la biblioteca por Todas, Mías y Compartidas"></video>

### El visor

<video class="phone" src="/projects/nebula/viewer-info.mp4" controls muted loop playsinline preload="metadata" aria-label="Abriendo una foto a pantalla completa, el panel de información y compartiendo desde el visor"></video>

Toca una foto y se agranda desde su cuadrado hasta ocupar toda la pantalla. Pasa por toda la galería deslizando, pellizca para ampliar el original a resolución completa, mira vídeos con controles propios y desliza hacia arriba para ver la fecha, la cámara y la ubicación.

### Subir fotos

<video class="phone" src="/projects/nebula/upload.mp4" controls muted loop playsinline preload="metadata" aria-label="Eligiendo una foto en el selector de subida y subiéndola como compartida"></video>

El selector propio de la app muestra las fotos del móvil con un ✓ en las que ya tienen copia. Antes de enviar nada, el móvil pregunta al servidor si ya tiene ese archivo exacto (por su huella SHA-256), así que nunca se suben duplicados. Las subidas continúan en segundo plano, privadas por defecto o compartidas.

### Gestionar las fotos

<video class="phone" src="/projects/nebula/select.mp4" controls muted loop playsinline preload="metadata" aria-label="Seleccionando fotos arrastrando, moviéndolas a la papelera y compartiendo una selección"></video>

Selecciona fotos tocándolas o deslizando el dedo sobre ellas y después compártelas, hazlas privadas, guárdalas en el móvil (como original o como JPEG) o bórralas. Al guardar se omiten las fotos que ya están en el móvil, así que nada se duplica.

<video class="phone" src="/projects/nebula/save.mp4" controls muted loop playsinline preload="metadata" aria-label="Guardando fotos desde el visor de vuelta en el móvil"></video>

### Papelera y ajustes

<video class="phone" src="/projects/nebula/trash.mp4" controls muted loop playsinline preload="metadata" aria-label="Restaurando y eliminando fotos en la papelera"></video>

Las fotos borradas permanecen 30 días en la papelera, donde se pueden restaurar o eliminar. Las fotos que la otra persona ha compartido no se pueden eliminar antes de tiempo: esperan los 30 días completos para que su dueño aún pueda restaurarlas. Los ajustes incluyen Face ID, el formato de descarga, el cambio de contraseña y cerrar sesión.

---

## Por dentro

- **Cada archivo se guarda una sola vez.** Si las dos personas suben la misma foto, se guarda una vez en disco, pero cada una tiene su propia entrada en la galería, con su propia visibilidad y su propia papelera.
- **Privacidad en cada endpoint.** Una foto que no tienes permiso para ver responde `404`, como si no existiera.
- **Rápida a cualquier escala.** Con 50.000 fotos de prueba, las páginas pasaron de 45-250 ms a **unos 5 ms** gracias a la paginación por cursor y a cambios en las consultas que permiten a Postgres usar sus índices.
- **Las fotos de cualquier móvil.** HEIC, JPEG, PNG, RAW (DNG) y vídeo, leyendo de cada archivo la fecha, la zona horaria local, el GPS y la cámara.
- **Segura por defecto.** Contraseñas con Argon2, tokens JWT, límite de intentos de login fallidos y HTTPS dentro de la red privada.
- **Siempre activa.** Un servicio de systemd que arranca con el equipo, se recupera de los fallos y vacía cada día la papelera caducada.
- **Probada.** 124 tests de backend (pytest) y 49 tests de la app (Jest).

---

## Retos

**Gestos que se pelean entre sí.** Deslizar, pellizcar y deslizar hacia abajo para cerrar se robaban los toques unos a otros en el visor. Escribí mi propio paginador de tres páginas donde todos los gestos viven en un único sistema, de modo que funcionan bien juntos.

**Vídeos grandes.** Calcular la huella de un vídeo de 1 GB en el móvil habría tardado 17 minutos. Ahora los archivos de más de 64 MB van directos al servidor, que detecta los duplicados por su cuenta.

**Fechas en el mes equivocado.** Postgres guarda las horas en UTC, lo que colocaba una foto de Nochevieja hecha en España en el diciembre anterior. Ahora cada foto conserva su propio desfase horario, así que se agrupa por la fecha en que se hizo realmente.

---

## Lo que aprendí

Este es el proyecto con el que más he aprendido, porque era mío: sin tutorial que seguir y sin nadie a quien dejarle las partes difíciles.

- **Construir para una necesidad real**, y dejar que mi propio uso de la app decidiera qué mejorar después.
- **Rendimiento de bases de datos**: leer planes de consulta, diseñar índices y medir en lugar de adivinar.
- **Desarrollo móvil**: gestos, animaciones, listas grandes y límites de memoria en un teléfono.
- **Mantener mi propio servidor**: servicios, redes privadas, almacenamiento y copias de seguridad.
- **Documentar las decisiones**: cada elección importante está escrita junto a sus alternativas y el motivo por el que ganó.
