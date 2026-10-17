const { cargarConfiguracion } = require("./configuracion");
const { crearServicioReservas } = require("./servicios/reservas");
const { crearApp } = require("./app");

const datosSemilla = [
  {
    id: 1,
    estudiante: "Ana Pérez",
    email: "ana@unca.edu.ar",
    sala: "Sala A",
    fecha: "2026-10-20",
    turno: "Mañana",
    personas: 3,
  },
  {
    id: 2,
    estudiante: "Carlos Gómez",
    email: "carlos@unca.edu.ar",
    sala: "Sala B",
    fecha: "2026-10-21",
    turno: "Tarde",
    personas: 2,
  },
  {
    id: 3,
    estudiante: "Lucía Díaz",
    email: "lucia@unca.edu.ar",
    sala: "Auditorio",
    fecha: "2026-10-22",
    turno: "Noche",
    personas: 5,
  },
  {
    id: 4,
    estudiante: "Mateo Ruiz",
    email: "mateo@unca.edu.ar",
    sala: "Sala C",
    fecha: "2026-10-23",
    turno: "Mañana",
    personas: 4,
  },
];

try {
  const config = cargarConfiguracion();

  const servicioReservas = crearServicioReservas(datosSemilla);

  const app = crearApp(config, servicioReservas);

  app.listen(config.port, () => {
    console.log(
      `[Servidor] Escuchando en http://localhost:${config.port} (Entorno: ${config.nodeEnv})`,
    );
  });
} catch (error) {
  console.error(`[Error crítico al iniciar] ${error.message}`);
  process.exit(1);
}
