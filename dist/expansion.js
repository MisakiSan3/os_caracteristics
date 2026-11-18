const expansion = {
  'tipos-de-sistemas-operativos': {
    summary: 'El tipo de sistema ayuda a explicar qué espera quien lo utiliza. Para una nómina nocturna interesa completar muchos trabajos; en una sesión interactiva importa que cada usuario perciba una respuesta rápida. También hay sistemas que coordinan varios equipos. Un cliente puede solicitar un servicio a un servidor, mientras que en una red entre iguales los equipos pueden desempeñar ambos papeles.',
    points: [
      'La multiprogramación mantiene varios trabajos disponibles para usar la CPU. En un solo núcleo, los trabajos se alternan aunque sus operaciones de entrada y salida puedan solaparse.',
      'Un clúster agrupa equipos para mejorar la capacidad de procesamiento o la disponibilidad. Un sistema distribuido coordina recursos de distintas máquinas a través de la red.',
      'Las categorías describen propiedades distintas. Un servidor puede atender solicitudes interactivas durante el día y ejecutar trabajos por lotes durante la noche.'
    ],
    scenario: 'Dos trabajos comparten una sola CPU. A genera un informe y necesita leer datos del disco. B procesa una lista que ya está en memoria.',
    steps: 'Compara los tres modos. En el lote secuencial del ejemplo, B empieza cuando termina A. En multiprogramación, B puede avanzar durante la espera de disco. En tiempo compartido, B recibe un turno aunque A todavía pueda seguir calculando.'
  },
  'historia-de-los-sistemas-operativos': {
    summary: 'Los primeros sistemas por lotes redujeron el tiempo perdido entre trabajos. El tiempo compartido abrió el acceso interactivo a varios usuarios mediante terminales. Después, la difusión de las computadoras personales cambió las prioridades hacia la interacción directa y la compatibilidad con aplicaciones. Más adelante, los móviles añadieron restricciones de energía y nuevas exigencias de aislamiento.',
    points: [
      'La reescritura de buena parte de UNIX en C facilitó llevarlo a distintas arquitecturas.',
      'La familia BSD surgió de la evolución de UNIX en Berkeley. Linux nació como un núcleo independiente de estilo UNIX.',
      'macOS llegó a partir de la tecnología de NeXT y combina componentes BSD y Mach en su base Darwin.'
    ],
    scenario: 'Un museo prepara una línea del tiempo para mostrar cómo cambió la experiencia de usar un ordenador, desde los terminales compartidos hasta el teléfono.',
    steps: 'Cambia de década y relaciona cada par de hitos con su entorno. Multics y UNIX ilustran el cómputo multiusuario; MS-DOS y Macintosh, la expansión del ordenador personal. Los hitos seleccionados pertenecen a líneas que coexistieron.'
  },
  'componentes-del-sistema': {
    summary: 'Los componentes colaboran cuando una acción atraviesa varias capas. Al abrir una imagen, el sistema de archivos resuelve su ruta, la gestión de entrada/salida solicita los bloques al dispositivo y la gestión de memoria pone los datos a disposición del proceso. Una caché puede evitar la lectura física si conserva una copia válida.',
    points: [
      'La gestión de almacenamiento libre registra bloques disponibles para que el sistema de archivos pueda asignarlos.',
      'Un búfer absorbe diferencias de velocidad entre productor y consumidor. Una caché conserva copias de datos para acelerar futuros accesos.',
      'Un controlador traduce solicitudes del sistema a operaciones del dispositivo y comunica el resultado al subsistema de entrada/salida.'
    ],
    scenario: 'En un visor de fotos puedes iniciar la aplicación o abrir una imagen que todavía no está en la caché del sistema. Cada acción pone en primer plano componentes diferentes.',
    steps: 'Alterna entre abrir la foto e iniciar el programa. Localiza quién organiza los bloques en el primer caso y quién prepara el contexto y la memoria en el segundo. El diagrama destaca la ruta principal de cada acción.'
  },
  'servicios-del-sistema': {
    summary: 'Las aplicaciones recurren a servicios comunes para trabajar con dispositivos y recursos compartidos. El sistema valida cada solicitud, decide cómo atenderla y devuelve un resultado o un código de error. Además, realiza tareas generales de administración, como repartir recursos entre usuarios y registrar su utilización.',
    points: [
      'El servicio de entrada/salida ofrece operaciones comunes aunque los dispositivos tengan mecanismos de control diferentes.',
      'La contabilidad del uso permite registrar recursos consumidos, como tiempo de CPU o espacio de disco.',
      'Los servicios de protección y detección de errores permiten rechazar accesos inválidos y comunicar fallos a las aplicaciones.'
    ],
    scenario: 'Dos cuentas intentan leer el mismo informe en una carpeta compartida. La primera tiene permiso de lectura y la segunda carece de él.',
    steps: 'Selecciona cada cuenta mediante la opción de permisos. El archivo y la solicitud son los mismos. Observa cómo la verificación decide si se entregan los bytes o se devuelve un error de acceso.'
  },
  'interfaz-de-programacion-de-aplicaciones': {
    summary: 'La API es el contrato que usa el programa fuente: qué función se llama, qué argumentos recibe y qué devuelve. La biblioteca ofrece una implementación o un envoltorio que prepara los argumentos de la llamada al sistema. El núcleo valida la petición antes de actuar sobre recursos protegidos.',
    points: [
      'Una llamada al sistema puede recibir parámetros en registros o mediante referencias a memoria, según la arquitectura y su convención.',
      'Un descriptor es un identificador que el proceso utiliza en operaciones posteriores como leer, escribir o cerrar un archivo.',
      'Funciones de biblioteca como strlen() trabajan con datos accesibles para el proceso. En C, strlen() cuenta bytes hasta el terminador nulo, lo que puede diferir del número de caracteres visibles.'
    ],
    scenario: 'Un editor calcula la longitud del nombre de un documento y luego solicita abrirlo. En su código, ambas acciones parecen llamadas a funciones.',
    steps: 'Alterna entre consultar la longitud y abrir el archivo. Busca el cambio de modo en la ruta de apertura: el núcleo debe validar el acceso y gestionar el descriptor. Contar bytes en la cadena puede resolverse con instrucciones del propio proceso.'
  },
  'operacion-del-sistema-operativo': {
    summary: 'Al encender el equipo, se ejecuta código de firmware que inicializa el hardware necesario y pone en marcha el cargador. El núcleo comienza a gestionar memoria, dispositivos y procesos. Una vez iniciado el sistema, el procesador controla qué instrucciones pueden ejecutar las aplicaciones y ofrece mecanismos para transferir el control al núcleo.',
    points: [
      'Una instrucción privilegiada, como modificar ciertos registros de control, está reservada al núcleo.',
      'El temporizador puede interrumpir una tarea para que el planificador recupere el control de la CPU.',
      'Una interrupción de dispositivo puede avisar que terminó una operación. Una llamada al sistema parte de una solicitud explícita del programa.'
    ],
    scenario: 'Primero enciendes el equipo. Una vez aparece el escritorio, una aplicación pide leer un archivo. En ambas situaciones interviene el núcleo en momentos distintos.',
    steps: 'Compara las dos secuencias. En el arranque, el cargador entrega el control a un núcleo que empieza a funcionar. En la segunda, una aplicación de un sistema ya iniciado solicita un servicio y recupera el control al terminar.'
  },
  'sistemas-operativos-por-su-estructura': {
    summary: 'Una misma operación puede resolverse dentro de un núcleo amplio o mediante la cooperación de varios servidores. Ubicar servicios en un espacio de direcciones común facilita llamadas directas; moverlos a espacios separados permite aislar fallos, a cambio de comunicación adicional. Muchos sistemas combinan decisiones de varias arquitecturas.',
    points: [
      'Un núcleo monolítico puede admitir módulos cargables sin trasladar esos módulos al espacio de usuario.',
      'En un diseño por capas, definir interfaces entre niveles facilita razonar sobre dependencias y modificar una capa.',
      'Un micronúcleo suele proporcionar mecanismos básicos como planificación, gestión de espacios de direcciones y comunicación entre procesos.'
    ],
    scenario: 'Un programa de copias solicita un archivo. Compara dónde vive el servicio que recibe esa petición y cómo llega la solicitud hasta él.',
    steps: 'Selecciona las dos estructuras. En el esquema monolítico el servicio de archivos forma parte del núcleo. En el esquema con micronúcleo, observa el salto al servidor separado y piensa qué componente podría reiniciarse si ese servicio falla, según la implementación.'
  },
  procesos: {
    summary: 'El programa en disco describe instrucciones y datos iniciales. Cuando se ejecuta, el sistema crea un proceso con memoria, recursos abiertos y un contexto que permite interrumpirlo y reanudarlo. Dos instancias del mismo programa pueden tener estados y recursos distintos.',
    points: [
      'Al cambiar de proceso, el sistema guarda información como el contador de programa y los registros para reanudar la ejecución después.',
      'Si termina el turno de CPU, un proceso puede volver a listo aunque no haya solicitado entrada/salida.',
      'En sistemas POSIX, fork() crea un proceso hijo y exec() sustituye la imagen del proceso por la de otro programa. El padre puede esperar la terminación del hijo.'
    ],
    scenario: 'Una aplicación de copias se inicia, recibe CPU y solicita leer del disco. Mientras espera, otra aplicación puede usar el procesador.',
    steps: 'Recorre Llegada, Turno de CPU, Solicitar E/S y Fin de E/S. Identifica en qué caso la copia espera un turno y en cuál espera al disco. Al terminar la lectura vuelve a listo y debe esperar a que le asignen CPU.'
  },
  'planificacion-de-la-cpu': {
    summary: 'Cuando hay varios procesos listos, la política de planificación establece quién recibe la CPU y cuándo puede cederla. En un equipo interactivo interesa comenzar pronto a responder. En un entorno por lotes pueden pesar más el rendimiento global y los tiempos de finalización. Cambiar de tarea también tiene un coste.',
    points: [
      'El tiempo de respuesta mide cuánto tarda un trabajo en obtener su primera atención. El tiempo de retorno incluye desde su llegada hasta su finalización.',
      'El tiempo de espera acumula los periodos que el proceso pasa en la cola de listos. En esta simulación equivale a finalización menos llegada y ráfaga.',
      'Un quantum pequeño reparte turnos con frecuencia, pero aumenta los cambios de contexto. SJF presupone conocer o estimar la duración de la siguiente ráfaga.'
    ],
    scenario: 'Tres trabajos llegan juntos a una sola CPU: A necesita 4 ms, B necesita 2 ms y C necesita 1 ms. El modelo supone ráfagas conocidas y cambios de contexto instantáneos.',
    steps: 'Compara primero FCFS con SJF y mira cuándo empieza C y cómo cambia la espera media. Después selecciona Round Robin. Observa cómo A vuelve a la cola tras 2 ms y cede el turno a B.'
  },
  'comunicacion-mediante-paso-de-mensajes': {
    summary: 'El paso de mensajes intercambia datos mediante operaciones explícitas de envío y recepción. El destino puede identificarse por proceso o mediante un canal compartido. Un búfer permite que productor y consumidor avancen a ritmos distintos hasta que se agote su capacidad.',
    points: [
      'Una cola FIFO entrega primero el mensaje más antiguo. Otros mecanismos pueden aplicar prioridades.',
      'Con una operación no bloqueante, el proceso recupera el control de inmediato y puede comprobar si el envío o la recepción tuvo éxito.',
      'En un canal sin búfer, una transferencia síncrona puede requerir que emisor y receptor coincidan.'
    ],
    scenario: 'Un productor envía trabajos de impresión a un consumidor. La cola de demostración admite como máximo dos trabajos pendientes y las operaciones regresan de inmediato.',
    steps: 'Pulsa Enviar tres veces. Los dos primeros trabajos entran y el tercero debe reintentarse. Pulsa Recibir dos veces para comprobar el orden M1, M2. Una recepción adicional muestra el caso de cola vacía.'
  },
  'memoria-compartida': {
    summary: 'El núcleo configura los mapeos para que dos procesos vean los mismos datos aunque cada uno tenga su propio espacio virtual. Este mecanismo resulta útil para intercambiar datos con frecuencia. La aplicación debe acordar el formato de esos datos y cómo coordinar los accesos.',
    points: [
      'En POSIX se puede abrir un objeto con shm_open() y asociarlo a la memoria virtual mediante mmap() con un mapeo compartido.',
      'Tras establecer el mapeo, leer y escribir la región se parece a usar memoria ordinaria. El sistema interviene en la configuración inicial y en eventos como fallos de página.',
      'Si un productor actualiza varios campos relacionados, el consumidor necesita coordinación para evitar leer una actualización parcial.'
    ],
    scenario: 'Un proceso A registra tareas terminadas en un contador que un panel B consulta. Ambos tienen acceso a la misma celda.',
    steps: 'Pulsa B lee para ver el valor inicial. Haz dos escrituras desde A y vuelve a leer desde B. El panel observa 2 porque ambos acceden a la misma región. Las acciones son secuenciales para aislar el efecto del mapeo.'
  },
  hilos: {
    summary: 'Un proceso puede tener un hilo encargado de la interfaz y otros dedicados a cálculos o solicitudes. Cada hilo conserva registros, estado de ejecución y una pila privada para sus llamadas. El código, el montón y otros recursos siguen compartidos, lo que facilita cooperar y obliga a coordinar las actualizaciones comunes.',
    points: [
      'La concurrencia permite avanzar varias tareas por turnos. Para ejecutar varios hilos en el mismo instante se necesitan recursos de CPU que puedan atenderlos simultáneamente.',
      'Según el modelo, varios hilos de usuario pueden compartir un hilo del núcleo o cada hilo de usuario puede corresponder a uno del núcleo.',
      'La pila reservada ocupa espacio de direcciones. La memoria física utilizada puede crecer bajo demanda, y existen otros costes por hilo además de su pila.'
    ],
    scenario: 'Un servidor reserva 12 MiB para recursos comunes y, en el modelo, 1 MiB de pila por cada hilo. Quieres estimar el efecto de aumentar el número de trabajadores.',
    steps: 'Compara 4 y 20 hilos. La estimación sube de 16 a 32 MiB: la base se mantiene en 12 MiB y se suman 16 pilas adicionales. Con un presupuesto de 32 MiB, el modelo admite hasta 20 hilos.'
  },
  sincronizacion: {
    summary: 'El orden de ejecución de hilos concurrentes puede variar por planificación o por paralelismo. Si dos actualizaciones se intercalan sobre los mismos datos, el resultado puede depender de ese orden. La sincronización impone reglas para preservar consistencia y esperar condiciones, como la llegada de un elemento a una cola.',
    points: [
      'Incrementar una variable suele implicar leerla, calcular el valor nuevo y escribirlo. La secuencia completa necesita protección cuando varios hilos la ejecutan sobre el mismo dato.',
      'El mutex debe cubrir toda la sección crítica. Liberarlo entre la lectura y la escritura deja expuesta la actualización.',
      'Un semáforo contador puede representar plazas disponibles en un búfer. Adquirir bloqueos en órdenes incompatibles puede causar interbloqueo.'
    ],
    scenario: 'Dos trabajadores completan una tarea cada uno y actualizan el mismo contador, que empieza en cero. El total esperado es dos.',
    steps: 'Compara Sin mutex y Con mutex. En el primer orden ambos leen 0 y escriben 1. En el segundo, B entra después de que A termina y lee 1. Observa que cambia el orden de lectura y escritura, no el número de tareas completadas.'
  },
  'memoria-principal': {
    summary: 'Los programas emiten direcciones lógicas que el hardware traduce bajo reglas configuradas por el sistema. Un esquema contiguo sencillo guarda la posición inicial de la región asignada y su longitud. En cada acceso comprueba el desplazamiento antes de sumarlo a la base física.',
    points: [
      'Con particiones fijas, el espacio sin usar dentro de una partición asignada es fragmentación interna.',
      'Con particiones dinámicas pueden quedar huecos separados cuya suma basta para una solicitud, aunque ningún hueco individual la admita. Es fragmentación externa.',
      'En el esquema base y límite se aceptan desplazamientos desde 0 hasta límite menos uno. El límite representa una longitud, no una dirección física.'
    ],
    scenario: 'El sistema asigna a un proceso 1000 bytes contiguos a partir de la posición física 4000. El proceso solicita posiciones relativas a su región.',
    steps: 'Introduce 240, 999 y 1000. Obtendrás 4240 y 4999 para los dos primeros. El tercero se rechaza porque 1000 es el primer desplazamiento fuera de la región.'
  },
  paginacion: {
    summary: 'Una dirección virtual se divide en un número de página y un desplazamiento. La unidad de gestión de memoria consulta la traducción de esa página y sustituye su número por el marco correspondiente. Así, páginas vecinas en un proceso pueden ocupar posiciones alejadas en la RAM.',
    points: [
      'La entrada de la tabla puede registrar permisos y si la página es válida o está presente, según el diseño.',
      'La paginación evita exigir una región física contigua para todo el proceso. Puede quedar espacio sin usar dentro de la última página asignada.',
      'Un fallo en la TLB puede resolverse consultando la tabla. Un fallo de página requiere intervención del sistema operativo.'
    ],
    scenario: 'Un proceso dispone de cuatro páginas virtuales de 4096 bytes. La tabla del ejemplo asigna la página 0 al marco 5 y la página 1 al marco 2.',
    steps: 'Introduce 4095 y luego 4096. La primera dirección está al final de la página 0 y la segunda al inicio de la página 1. Aunque son contiguas en el espacio virtual, sus posiciones físicas son 24575 y 8192.'
  },
  'memoria-virtual': {
    summary: 'Con paginación bajo demanda, al acceder a una página válida ausente el sistema busca su contenido y prepara un marco para cargarla. Si debe reemplazar una página modificada, puede necesitar escribir sus datos antes de reutilizar el marco. Después actualiza la traducción y reanuda la instrucción que provocó el fallo.',
    points: [
      'Un acceso inválido o contrario a los permisos se gestiona como un error de protección. El simulador solo usa referencias válidas.',
      'En FIFO un acierto deja la antigüedad intacta. En LRU un acceso reciente cambia qué página será candidata a reemplazo.',
      'Si los procesos necesitan continuamente más páginas activas que marcos disponibles, el intercambio frecuente puede dominar el tiempo de ejecución.'
    ],
    scenario: 'Un proceso accede a A, B, A, C, A y B, en ese orden. Tiene solo dos marcos, vacíos al inicio, y el sistema aplica FIFO.',
    steps: 'Avanza hasta la tercera referencia para ver el acierto en A. En el cuarto acceso C expulsa A porque entró primero, aunque se acaba de consultar. Completa la traza para comprobar que hay cinco fallos en seis accesos.'
  },
  'almacenamiento-secundario': {
    summary: 'El sistema presenta los dispositivos de almacenamiento como espacios direccionables y organiza ese espacio en volúmenes sobre los que pueden vivir sistemas de archivos. En un disco magnético influyen la búsqueda del cabezal y la rotación; en un SSD, la controladora gestiona las limitaciones y el desgaste de la memoria flash.',
    points: [
      'Una partición divide el espacio visible de una unidad. Un volumen lógico puede usar espacio procedente de varios dispositivos o particiones.',
      'RAID 0 reparte bloques para aprovechar varias unidades, sin redundancia. RAID 1 mantiene copias de los datos.',
      'La redundancia ayuda frente a ciertos fallos de hardware. Una copia de seguridad permite recuperar datos ante borrados, corrupción u otros daños que afecten al arreglo.'
    ],
    scenario: 'Tienes dos discos de 1 TB para un servidor. Debes comparar la capacidad disponible y el efecto de perder una unidad.',
    steps: 'Alterna entre RAID 0 y RAID 1. Identifica qué bloques quedarían tras perder el disco B. En RAID 0 faltarían bloques que existen solo en B. En RAID 1, A conserva una copia completa y la capacidad útil es de 1 TB.'
  },
  'sistema-de-archivos': {
    summary: 'El sistema de archivos ofrece una vista lógica de archivos y directorios sobre el almacenamiento. Resolver un nombre suele implicar recorrer entradas de directorio hasta localizar la estructura que describe el archivo. Una vez abierto, el proceso utiliza un identificador para operar sobre él.',
    points: [
      'Una ruta relativa parte del directorio de trabajo o de un directorio de referencia; una ruta absoluta parte de la raíz.',
      'Separar nombre y metadatos permite que una entrada encuentre el objeto que contiene atributos y referencias a los datos.',
      'Si falta un componente de la ruta, o no se permite atravesar un directorio, la búsqueda puede fallar antes de llegar al archivo.'
    ],
    scenario: 'Una aplicación de estudio abre unos apuntes y una imagen. Ambos archivos están bajo curso, pero la imagen vive en un subdirectorio.',
    steps: 'Alterna entre las dos rutas y sigue los bloques desde /. Señala en cuál debe resolverse img antes de encontrar el archivo. Recorrer el nombre es el paso lógico previo a leer su contenido.'
  },
  'implementacion-de-sistemas-de-archivos': {
    summary: 'El sistema de archivos traduce posiciones lógicas de archivo a bloques del dispositivo. También mantiene estructuras para localizar nombres y saber qué bloques se pueden reutilizar. La elección del método de asignación influye en el acceso aleatorio, el crecimiento del archivo y el coste de sus metadatos.',
    points: [
      'Una asignación por extents describe rangos contiguos y puede permitir que un archivo crezca usando varios rangos.',
      'La asignación enlazada permite ubicar bloques separados, pero saltar a una posición puede requerir seguir referencias anteriores.',
      'Un mapa de bits puede registrar un estado libre u ocupado por bloque. Directorios grandes pueden usar índices para evitar revisar todas las entradas.'
    ],
    scenario: 'Un reproductor necesita el tercer bloque de un archivo de tres bloques, como cuando saltas hacia adelante en una reproducción.',
    steps: 'Compara Contigua, Enlazada e Indexada. Distingue cuándo puedes sumar un desplazamiento, cuándo debes recorrer punteros y cuándo consultar una entrada del índice. Los números físicos ilustran tres formas alternativas de guardar el mismo contenido.'
  }
};
