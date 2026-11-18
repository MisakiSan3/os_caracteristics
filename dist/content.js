const groups = [
  ['Introducción', 'introduccion', [
    ['Tipos de sistemas', 'tipos-de-sistemas-operativos', 'Los sistemas operativos pueden clasificarse por cómo ejecutan trabajos y por cómo conectan los equipos que participan en una tarea.',
      ['El procesamiento por lotes ejecuta trabajos agrupados sin interacción durante su ejecución.', 'La multiprogramación aprovecha la CPU mientras un trabajo espera una entrada o salida.', 'El tiempo compartido reparte la CPU en intervalos breves para ofrecer una respuesta interactiva.'],
      'Cómo se alternan dos trabajos', [
        ['Por lotes','A completo › B completo','Los trabajos se entregan juntos. En este ejemplo el lote se ejecuta de forma secuencial.'],
        ['Multiprogramado','A ejecuta › A espera E/S › B ejecuta','La CPU puede ejecutar B durante la espera de A.'],
        ['Tiempo compartido','Turno A › Turno B › Turno A › Turno B','Un temporizador permite alternar tareas aunque ninguna esté esperando E/S.']]],
    ['Historia', 'historia-de-los-sistemas-operativos', 'La historia de los sistemas operativos reúne líneas que nacieron en grandes centros de cómputo, llegaron al ordenador personal y se adaptaron a nuevos dispositivos.',
      ['Multics desarrolló ideas de tiempo compartido e influyó en UNIX.', 'UNIX favoreció la portabilidad y dio lugar a distintas familias de sistemas.', 'Los ordenadores personales popularizaron plataformas como MS-DOS y Macintosh.'],
      'Recorre algunos hitos', [
        ['1960–1969','Multics › UNIX','Multics se desarrolla en los años sesenta. El trabajo en UNIX comienza en 1969.'],
        ['1980–1989','MS-DOS › Macintosh','MS-DOS llega al IBM PC en 1981. Apple presenta el Macintosh en 1984.'],
        ['1990–1999','Linux › Windows 95','El núcleo Linux surge en 1991. Windows 95 llega a los PC en 1995.'],
        ['2000–2009','Mac OS X › Android','Mac OS X se lanza en 2001 y el primer dispositivo comercial con Android llega en 2008.']]]
  ]],
  ['Organización', 'organizacion', [
    ['Componentes', 'componentes-del-sistema', 'El sistema operativo reparte responsabilidades entre componentes que administran procesos, memoria, entrada y salida, almacenamiento y archivos.',
      ['El gestor de procesos asigna tiempo de CPU.', 'El gestor de memoria asigna y protege regiones.', 'El sistema de archivos organiza datos persistentes y se apoya en los controladores de E/S.'],
      'Quién atiende cada tarea', [
        ['Abrir una foto','Aplicación › Sistema de archivos › Controlador › Disco','El sistema de archivos localiza los datos y el controlador interactúa con el dispositivo.'],
        ['Iniciar un programa','Lanzador › Gestor de procesos › Gestor de memoria','Se crea el proceso y se prepara su espacio de direcciones.']]],
    ['Servicios', 'servicios-del-sistema', 'El sistema operativo ofrece servicios a aplicaciones y usuarios. También coordina recursos, controla el acceso y detecta errores.',
      ['Cargar y ejecutar programas es un servicio básico.', 'Las aplicaciones pueden solicitar E/S, manejo de archivos y comunicación.', 'La protección verifica que el proceso tenga permiso para usar el recurso.'],
      'Solicitud de lectura de un archivo', [
        ['Con permiso','Aplicación › Verificar permisos › Leer › Entregar datos','El sistema devuelve los bytes disponibles.'],
        ['Sin permiso','Aplicación › Verificar permisos › Acceso denegado','El sistema comunica un error y protege el contenido.']]],
    ['Interfaz de programación', 'interfaz-de-programacion-de-aplicaciones', 'Una API define funciones para las aplicaciones. Una biblioteca puede implementar una función en espacio de usuario o invocar una llamada al sistema para solicitar un servicio al núcleo.',
      ['POSIX especifica interfaces comunes en sistemas tipo UNIX.', 'Windows API ofrece interfaces de programación propias de Windows.', 'Las llamadas al sistema cruzan de forma controlada al modo núcleo.'],
      'De la API al núcleo', [
        ['Abrir archivo','Aplicación › open() › Llamada al sistema › Descriptor','El núcleo devuelve un descriptor si puede abrir el archivo.'],
        ['Consultar longitud','Aplicación › strlen() › Longitud','La biblioteca cuenta bytes hasta el primer byte nulo. La operación no requiere una llamada al sistema.']]],
    ['Operación del sistema', 'operacion-del-sistema-operativo', 'El arranque prepara el equipo y carga el núcleo. Durante la ejecución, el procesador distingue entre modos con distintos privilegios.',
      ['El firmware inicia el arranque y transfiere el control al cargador.', 'El núcleo ejecuta operaciones privilegiadas.', 'Una llamada al sistema o una interrupción puede transferir el control al núcleo.'],
      'Sigue el control del procesador', [
        ['Arranque','Firmware › Cargador › Núcleo › Procesos iniciales','El cargador sitúa el núcleo en memoria y le cede el control.'],
        ['Llamada al sistema','Modo usuario › Modo núcleo › Modo usuario','El núcleo atiende la solicitud y devuelve el control al programa.']]],
    ['Sistemas por su estructura', 'sistemas-operativos-por-su-estructura', 'La estructura describe dónde se ejecutan los servicios y cómo se relacionan. Cambiar esa organización afecta la comunicación, el mantenimiento y el aislamiento.',
      ['En un núcleo monolítico muchos servicios operan en el espacio del núcleo.', 'La organización por capas define dependencias entre niveles.', 'Un micronúcleo conserva funciones básicas y puede ejecutar otros servicios en procesos separados.'],
      'Ruta para consultar un archivo', [
        ['Monolítico','Aplicación › Núcleo [archivos + controladores] › Disco','Los servicios internos pueden comunicarse mediante llamadas directas.'],
        ['Micronúcleo','Aplicación › Micronúcleo › Servidor de archivos','El servicio de archivos puede residir en espacio de usuario y recibir mensajes.']]]
  ]],
  ['Gestión de procesos', 'procesos', [
    ['Procesos', 'procesos', 'Un proceso es una instancia en ejecución de un programa, con contexto, espacio de direcciones y recursos asociados.',
      ['El bloque de control guarda datos como el estado y el contexto del proceso.', 'Un proceso listo espera CPU y uno bloqueado espera un evento.', 'Un proceso puede crear hijos, lo que forma un árbol de procesos.'],
      'Ciclo de vida de un proceso', [
        ['Llegada','Nuevo › Listo','El proceso entra en la cola de listos.'],
        ['Turno de CPU','Listo › En ejecución','El planificador le asigna la CPU.'],
        ['Solicitar E/S','En ejecución › Bloqueado','La tarea espera a que termine la operación.'],
        ['Fin de E/S','Bloqueado › Listo','La tarea vuelve a competir por la CPU.']]],
    ['Planificación de la CPU', 'planificacion-de-la-cpu', 'El planificador elige qué proceso listo recibe la CPU. Los algoritmos priorizan objetivos como la rapidez de respuesta, el tiempo de espera o la equidad.',
      ['FCFS respeta el orden de llegada.', 'SJF elige la ráfaga más corta entre las tareas disponibles.', 'Round Robin reparte turnos de duración máxima fija.'],
      'Diagrama de Gantt', 'schedule'],
    ['Paso de mensajes', 'comunicacion-mediante-paso-de-mensajes', 'Los procesos pueden comunicarse enviando y recibiendo datos mediante canales como colas. El mecanismo puede bloquear al emisor o al receptor según la operación y el espacio disponible.',
      ['La comunicación puede ser directa o usar un buzón.', 'El búfer almacena temporalmente mensajes pendientes.', 'Una recepción bloqueante espera cuando la cola está vacía.'],
      'Cola FIFO con capacidad de dos mensajes', 'messages'],
    ['Memoria compartida', 'memoria-compartida', 'Dos procesos pueden mapear una región común en sus espacios de direcciones y acceder a los mismos datos.',
      ['Las direcciones virtuales de la región pueden diferir entre procesos.', 'Después del mapeo, los procesos pueden leer y escribir directamente.', 'Los accesos concurrentes deben coordinarse cuando algún proceso modifica los datos.'],
      'Dos procesos, una celda compartida', 'shared'],
    ['Hilos', 'hilos', 'Un hilo es un flujo de ejecución dentro de un proceso. Los hilos comparten el código y otros recursos del proceso, y cada uno tiene su propia pila y contexto.',
      ['Los hilos permiten mantener la interfaz receptiva mientras avanza otra tarea.', 'En equipos multinúcleo varios hilos pueden ejecutarse en paralelo.', 'La memoria para las pilas crece con el número de hilos.'],
      'Calculadora de memoria por número de hilos', 'threads'],
    ['Sincronización', 'sincronizacion', 'La sincronización coordina tareas concurrentes para proteger datos compartidos o esperar a que ocurra un evento.',
      ['Una sección crítica accede a recursos compartidos que podrían quedar inconsistentes.', 'Un mutex permite que un solo hilo entre a la sección crítica.', 'Los semáforos pueden gestionar permisos de acceso a un conjunto de recursos.'],
      'Dos hilos incrementan un contador en cero', [
        ['Sin mutex','A lee 0 › B lee 0 › A escribe 1 › B escribe 1','Resultado final: 1. Se pierde un incremento.'],
        ['Con mutex','A lee 0 y escribe 1 › B lee 1 y escribe 2','Resultado final: 2. Cada hilo completa su incremento antes del siguiente.']]]
  ]],
  ['Gestión de la memoria', 'memoria', [
    ['Memoria principal', 'memoria-principal', 'El gestor asigna RAM, protege las regiones de cada proceso y participa en la traducción de sus direcciones a posiciones físicas.',
      ['La reubicación puede ocurrir al compilar, al cargar o durante la ejecución.', 'La asignación contigua puede generar fragmentación interna o externa.', 'La protección impide que un proceso acceda a una región fuera de sus límites.'],
      'Traducción con registro base y límite', 'base'],
    ['Paginación', 'paginacion', 'La paginación divide el espacio virtual en páginas y la memoria física en marcos del mismo tamaño. Una tabla registra el marco asociado a cada página.',
      ['Las páginas de un proceso pueden residir en marcos no contiguos.', 'El desplazamiento se conserva al traducir la dirección.', 'Una TLB guarda traducciones recientes para acelerar los accesos.'],
      'Traduce una dirección con páginas de 4 KiB', 'paging'],
    ['Memoria virtual', 'memoria-virtual', 'La memoria virtual permite ejecutar programas aunque solo parte de su espacio de direcciones esté residente en RAM. La paginación bajo demanda carga las páginas cuando se necesitan.',
      ['Un acceso válido a una página ausente provoca un fallo de página.', 'Si no quedan marcos libres, un algoritmo elige una página para reemplazar.', 'FIFO reemplaza la página más antigua y LRU la que lleva más tiempo sin usarse.'],
      'Paginación bajo demanda con dos marcos', 'virtual']
  ]],
  ['Gestión del almacenamiento', 'almacenamiento', [
    ['Almacenamiento secundario', 'almacenamiento-secundario', 'Los dispositivos secundarios conservan datos sin alimentación. El sistema organiza su uso mediante bloques, particiones y volúmenes.',
      ['En un HDD, mover el cabezal contribuye al tiempo de acceso.', 'Los SSD almacenan datos en memoria de estado sólido y prescinden de partes móviles.', 'RAID combina unidades con objetivos de rendimiento o redundancia según el nivel.'],
      'Capacidad con dos discos de 1 TB', [
        ['RAID 0','Disco A [bloques 1 y 3] › Disco B [bloques 2 y 4]','Capacidad útil: 2 TB. Si falla un disco se pierde el arreglo.'],
        ['RAID 1','Disco A [bloques 1 y 2] › Disco B [copia de 1 y 2]','Capacidad útil: 1 TB. Puede tolerar el fallo de una unidad.']]],
    ['Sistemas de archivos', 'sistema-de-archivos', 'Un sistema de archivos organiza datos persistentes con nombres, directorios y metadatos. La ruta permite encontrar un archivo recorriendo los directorios.',
      ['Los metadatos describen atributos como permisos y tamaño.', 'Las operaciones habituales incluyen abrir, leer, escribir y cerrar.', 'Una ruta absoluta empieza en la raíz.'],
      'Recorre una ruta absoluta', [
        ['/curso/apuntes.txt','/ › curso/ › apuntes.txt','La búsqueda parte de la raíz y localiza el archivo en el directorio curso.'],
        ['/curso/img/cpu.png','/ › curso/ › img/ › cpu.png','El sistema desciende un nivel más antes de localizar la imagen.']]],
    ['Implementación de sistemas de archivos', 'implementacion-de-sistemas-de-archivos', 'La implementación decide cómo buscar entradas de directorio, asignar bloques a archivos y registrar el espacio libre.',
      ['La asignación contigua permite calcular fácilmente la posición de cada bloque.', 'La asignación enlazada facilita el crecimiento y puede exigir recorrer la cadena.', 'La asignación indexada reúne referencias a bloques para permitir acceso directo.'],
      'Localiza el tercer bloque de un archivo', [
        ['Contigua','Inicio 12 › 12 + 2 › Bloque 14','Los tres bloques son consecutivos: 12, 13 y 14.'],
        ['Enlazada','Bloque 12 › Bloque 5 › Bloque 20','Para conocer el tercer bloque se siguen los enlaces de los dos primeros.'],
        ['Indexada','Índice [12, 5, 20] › Entrada 3 › Bloque 20','La tabla indica directamente dónde está el tercer bloque.']]]
  ]]
];
