# Guía de Estilos e Interfaz (UI/UX) - Servite

Esta guía documenta los principios de diseño, la paleta de colores, las animaciones, y las estructuras de diseño (layouts) fundamentales utilizados en Servite para asegurar una interfaz consistente, dinámica y premium.

---

## 1. Paleta de Colores Principal

El esquema de colores de Servite busca contrastes altos para entornos con poca iluminación (como bares) y llamados a la acción claros.

- **Naranja Servite (`#FF6600`)**: Color primario para acciones destacadas (ej. botón de "Cargar exacto", iconos de advertencia, flechas activas, badges y logos).
- **Amarillo (`#FFBF00`)**: Color secundario, usado en promociones, saldos destacados y filtros importantes.
- **Gris Oscuro / Negro (`#1A1716`)**: Color de texto principal, fondos de tarjetas seleccionadas, chips de filtros primarios (ej. "Cercanos") y botones "Seleccionar" principales.
- **Gris Medio (`#4A4A4A` a `#6c757d`)**: Utilizado para textos secundarios, botones de retroceso (flechas de navegación) e iconos deshabilitados.
- **Gris Claro (`#E9ECEF`)**: Fondos secundarios, contenedores de inputs, tarjetas laterales (peek cards) en estado inactivo.
- **Blanco (`#FFFFFF`)**: Usado como color de superficie (tarjetas base), texto sobre botones oscuros e iconos invertidos.
- **Rojo Peligro (`#dc3545`)**: Utilizado exclusivamente para alertar "Saldo Insuficiente".
- **Verde Éxito (`#28a745`)**: Utilizado para mensajes de éxito, como recargas confirmadas.

---

## 2. Tamaños, Espaciados y Bordes (Padding & Radii)

Servite usa un diseño basado en bordes muy redondeados (apariencia de píldora) para una experiencia "Mobile First".

- **Tarjetas y Contenedores (Cards)**:
  - Típicamente usan un `borderRadius: "18px"` (para tarjetas principales) o `14px` (para chips e iconos).
  - El padding estándar interno de las tarjetas suele ser de `16px 20px`.
  
- **Botones y Acciones**:
  - Los botones grandes ("Seleccionar") usan un `borderRadius: "30px"` creando la apariencia de una píldora (`Pill Shape`).
  - Los inputs numéricos grandes de recarga también utilizan `borderRadius: "30px"` y un padding robusto de `18px 24px`.

- **Márgenes Negativos y Layouts Fluidos**:
  - Para carruseles que se desbordan visualmente, se utiliza `margin: "0 -20px"` para compensar el padding de la aplicación principal y permitir que las tarjetas lleguen a los bordes de la pantalla.
  
- **Carrusel CSS Grid**:
  - Para elementos solapados (Animaciones de entrada/salida de tarjetas), se utiliza un contenedor `display: "grid"` en el que todos los elementos hijos ocupan el mismo espacio mediante `gridArea: "1 / 1"`. Esto permite que la altura dinámica se ajuste automáticamente al tamaño del hijo más grande, evitando recortes o barras de desplazamiento forzadas.

---

## 3. Animaciones e Interactividad

Servite depende en gran medida de `framer-motion` para otorgar fluidez e interactividad.

- **Pulsación (Tap)**: 
  - La mayoría de los botones tienen `whileTap={{ scale: 0.95 }}` o `0.98` para dar retroalimentación táctil de que la acción ha sido recibida.
- **Transiciones de Páginas y Tabs**:
  - Se utilizan `variants` como `initial={{ opacity: 0, x: -20 }}` para animar la entrada suave de las vistas.
- **Carrusel Coherente (Spring Animation)**:
  - Al cambiar de cerveza, el carrusel se desliza hacia la izquierda o la derecha respetando la dirección de la navegación (`direction > 0`).
  - Esto se logra con: `transition={{ type: "spring", stiffness: 300, damping: 30 }}`.
- **Agitación por Error (Shake Effect)**:
  - Cuando hay un error (por ejemplo, saldo insuficiente o monto vacío), los componentes usan una animación de sacudida horizontal: `x: [-10, 10, -10, 10, 0]` junto a un destello de borde rojo.
- **Efectos Hover (Sutiles)**:
  - Los elementos clickeables suelen elevarse ligeramente (`y: -2`) y añadir sombras suaves `boxShadow` de dispersión grande e intensidad baja (`rgba(0,0,0,0.05)`).

---

## 4. Estados Inactivos y "Peeking Cards"

Cuando hay tarjetas adyacentes en carruseles de selección:

- **Efecto Peek (Asomar)**:
  - Las tarjetas anterior y siguiente asoman por los bordes con `opacity: 1` pero reduciendo su saturación con `filter: "grayscale(100%) brightness(0.9)"`. 
  - Son achicadas levemente mediante `transform: "scale(0.9)"` con `transformOrigin` alineado al borde del que asoman.
  - El botón de selección en estas tarjetas adopta un color gris estático (`#8B8B8B`) para dejar en claro que no es el foco principal hasta que se navega hacia ellas.

---

## 5. Accesibilidad Visual

- Se omite el indicador nativo de "spin" (`::-webkit-inner-spin-button`) en los campos numéricos a favor de un diseño limpio.
- Los toggles y estados cuentan con iconos consistentes en la librería `lucide-react` para complementar siempre los textos indicativos.
