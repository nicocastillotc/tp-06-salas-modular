TP 06: Refactorización Modular de Reservas de Salas

Descripción: Este proyecto corresponde al TP6, donde organicé y refactoricé la aplicación anterior de Express y EJS para separar las responsabilidades en módulos independientes de arranque, configuración, aplicación, rutas, controladores, servicios y middlewares[cite: 1, 2]. Todo el comportamiento funcional, las vistas, los estilos y el contrato de rutas se mantuvo intacto tal como se solicitó[cite: 1, 2, 3].

Instalación y ejecución
`npm install`

Verificación de formato y linters
`npm run format`
`npm run check`

Ejecución del Servidor
`npm start`

Configuración del entorno 
El sistema lee `PORT` y `NODE_ENV` desde las variables de entorno. Si el puerto no existe, toma por defecto `3000`. Valida que sea un número entero entre 1 y 65535, arrojando un error claro si es inválido. Además, ajusta automáticamente el formato de Morgan a `dev` en desarrollo y `combined` en producción

Mapa de módulos y dependencias
`src/index.js`:Punto de entrada. Define la semilla inicial, inicializa el servicio, carga la configuración y levanta el servidor HTTP.

`src/configuracion.js`: Valida y procesa las variables de entorno (`PORT` y `NODE_ENV`)

`src/app.js`: Configura Express, los motores de vistas EJS y layouts, el pipeline completo de middlewares y el manejador 404 final.

`src/rutas/reservas.js`: Agrupa y relaciona los caminos relativos (`/`, `/nueva`, `/:id`) con los middlewares de área y controladores correspondientes

`src/controladores/reservas.js`: Maneja la lógica de interacción con el servicio, renderiza las vistas EJS, responde JSON o maneja las redirecciones.

`src/servicios/reservas.js`: Gestiona exclusivamente el almacenamiento en memoria RAM del arreglo de reservas (listar, buscar, contar y crear).

`src/middleware/`: Contiene los middlewares separados en `solicitudes.js` (ID único y medición de tiempos con el evento `finish`) y `reservas.js` (asignación de sección y validación estricta de formularios).

Pipeline y contrato de rutas

Ingresa la petición HTTP al servidor
    |
Morgan (según entorno development/production) --> Loguea en la consola la solicitud.
    |
identificarSolicitud --> Genera y asigna el ID único (ej. BIB-0001) en res.locals.
    |
medirDuracion --> Inicia el temporizador (process.hrtime) y escucha el evento "finish".
    |
expressLayouts --> Prepara la plantilla base EJS (main.ejs).
    |
express.static --> Busca recursos estáticos en la carpeta public/css/estilos.css.
    |
express.urlencoded --> Procesa el cuerpo del formulario POST y arma el req.body.
    |
Rutas globales y JSON (/ y /estado)
    |
reservasRouter (Prefijo /reservas)
    |
prepararAreaReservas --> Define res.locals.seccion = "Reservas de salas".
    |
validarReserva --> Controla campos obligatorios, email con '@', sala/turno permitidos y personas de 1 a 6. Si es válido, pasa con next(). Si falla, responde 400 y re-renderiza sin llamar a next().
    |
Controlador / crearReserva --> Inserta en el servicio y ejecuta res.redirect("/reservas") (código 302).
    |
Se envía la respuesta y se dispara el evento "finish" imprimiendo los milisegundos transcurridos.