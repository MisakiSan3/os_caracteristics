# Sistemas operativos

Guía de estudio interactiva en español, desarrollada con HTML, CSS, JavaScript y Bootstrap 5.3.8. Las 19 fichas incluyen un resumen, puntos importantes y un caso práctico con instrucciones para interpretar la demostración.

## Cómo abrir la guía

Abre `dist/index.html` en el navegador. Bootstrap está incluido en el proyecto, así que la guía y sus simuladores funcionan sin instalar dependencias ni ejecutar una compilación. Los enlaces a los apuntes originales requieren conexión a Internet.

Si prefieres usar un servidor local, ejecuta desde la raíz del proyecto:

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory dist
```

Visita [http://127.0.0.1:8000](http://127.0.0.1:8000).

## Temario

| Bloque | Subtemas |
| --- | ---: |
| Introducción | 2 |
| Organización | 5 |
| Gestión de procesos | 6 |
| Gestión de la memoria | 3 |
| Gestión del almacenamiento | 3 |

Las demostraciones incluyen un comparador de planificación de CPU, una calculadora de memoria reservada por hilo, una cola de mensajes y un simulador de reemplazo de páginas FIFO.

## Estructura

- `dist/index.html` contiene la estructura de la página.
- `dist/styles.css` define el tema oscuro y el diseño adaptable.
- `dist/content.js` organiza el temario, los resúmenes base y los ejemplos.
- `dist/expansion.js` contiene las ampliaciones y las instrucciones de cada caso práctico.
- `dist/app.js` gestiona la navegación y las demostraciones.
- `dist/bootstrap.min.css` y `dist/bootstrap-LICENSE.txt` contienen la biblioteca de estilos y su licencia.

## Fuentes

Contenido adaptado de los [apuntes de Sistemas Operativos de Jesús Torres, Universidad de La Laguna](https://ull-esit-sistemas-operativos.github.io/ssoo-apuntes/introduccion/definiciones/), bajo licencia [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.es/). Bootstrap se distribuye bajo licencia MIT.
