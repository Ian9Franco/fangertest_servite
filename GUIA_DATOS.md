# Guía de Administración de Datos - Servite

Manual operativo de Servite. Esta guía te explica cómo estructurar, agregar y vincular información clave de bares, canillas (taps) y recursos gráficos para que funcionen perfectamente en los mapas interactivos y el motor de la interfaz de usuario.

---

## 1. Archivo Maestro de Datos
Toda la base de datos inicial de los bares y sus canillas está alojada estáticamente en el archivo JSON:
`data/breweries.json`

> **Nota:** La aplicación lee este archivo en cada recarga para alimentar los listados y el mapa.

---

## 2. Cómo Agregar un Nuevo Bar
Para agregar una cervecería, debes insertar un nuevo bloque de objeto dentro del arreglo principal de `breweries.json`.

```json
{
  "id": 4,
  "name": "Nombre del Nuevo Bar",
  "address": "Dirección Física Completa",
  "lat": -34.5888,
  "lng": -58.3934,
  "isFavorite": false,
  "balance": 0,
  "logo": "/assets/breweries/mi_bar_logo.png",
  "distance": "500m",
  "tapValueMultiplier": 1.0,
  "taps": []
}
```

### Integración con el Mapa (`lat` y `lng`)
Para que el bar aparezca con su pin interactivo en la pestaña de Mapas, **es obligatorio** proporcionar las coordenadas geográficas exactas en los campos `lat` (Latitud) y `lng` (Longitud).
*Tip: Puedes obtener estas coordenadas haciendo clic derecho sobre cualquier ubicación en Google Maps y copiando los números.*

---

## 3. Cómo Agregar y Asignar Canillas
A diferencia de sistemas relacionales, Servite utiliza una estructura anidada y eficiente. **Las canillas (bebidas) se declaran directamente dentro del array `"taps"` del bar que las provee.**

```json
{
  "id": 401,
  "name": "Lager Amstel",
  "price": "400",
  "img": "/assets/drinks/bambu_pilsner.png",
  "tag": "Canilla 1",
  "vol": "100ml",
  "alc": "3%",
  "ibu": "3",
  "type": "LAGER",
  "color": "#ffeb3b",
  "logo": "/assets/brew_brand/amstel.png"
}
```

### Campos Importantes de la Canilla:
- **`tag`**: Texto que aparece arriba del nombre (Ej. "Canilla 1").
- **`color`**: Código Hexadecimal que la app usará para dibujar la burbuja visual del estilo de cerveza (Ej. `#ffeb3b` para una rubia/lager).
- **`logo` (Opcional)**: Si la cerveza pertenece a una marca registrada (ej. Amstel, Patagonia), puedes asignar un logo específico. Si omites este campo, la app usará inteligentemente el isotipo de Servite.

---

## 4. Gestión de Imágenes y Lógica de Fondos Dinámicos
Para garantizar la estética premium de la aplicación, es vital ubicar las imágenes en las carpetas correctas dentro de `public/assets/`. La UI de Servite cuenta con una lógica que previene logos ilegibles.

### A. Foto del Vaso o Chop (`tap.img`)
- **Directorio:** `public/assets/drinks/`
- **Requisitos:** Imágenes PNG con **fondo totalmente transparente** (con el chop centrado).
- **Ejemplo:** `/assets/drinks/bambu_pilsner.png`
- *Puedes reutilizar el mismo modelo de vaso en múltiples canillas de distintos bares.*

### B. Logo del Bar (`bar.logo`)
- **Directorio:** `public/assets/breweries/`
- **Regla de Fondo Inteligente:** Por defecto, todos los logos de los bares se renderizarán sobre un **fondo negro oscuro (`#1A1716`)**. Esto hace brillar a los logos blancos transparentes.
- **Excepción:** Si tu logo es de líneas/texto color negro con fondo transparente (que se volvería invisible sobre negro), debes incluir la palabra **"negro"** en el nombre de tu archivo (Ej. `mi_bar_negro.png`). La app lo detectará automáticamente y le aplicará un hermoso fondo blanco puro (`#fff`).

### C. Logo de la Marca de la Canilla (`tap.logo`)
- **Directorio:** `public/assets/brew_brand/` (o `public/assets/brand/` para isotipos de la app).
- **Regla:** Aplica exactamente la misma lógica de inteligencia visual. Si el logo incluye la palabra "negro" en su nombre, recibe fondo blanco; de lo contrario, se enmarca en fondo negro.

---

## 5. El Panel de Administración Oculto
Para acelerar las pruebas, Servite cuenta con un creador visual en vivo:

1. Ve a la pantalla de Login y elige el perfil **Sofia**. (Sofia tiene privilegios de Admin).
2. Dirígete a la pestaña de **Mapa de Bares**.
3. Arriba a la derecha presiona **"Administrar Bares/Canillas"**.
4. Se abrirá una suite de herramientas avanzadas donde puedes crear bares nuevos con un clic usando *presets* de latitud y longitud, y rellenar sus canillas utilizando selectores de colores nativos y plantillas precargadas.
