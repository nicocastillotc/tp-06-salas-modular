// src/rutas/reservas.js
const { Router } = require("express");
const {
  prepararAreaReservas,
  validarReserva,
} = require("../middleware/reservas");
const { crearControladorReservas } = require("../controladores/reservas");

function crearRutasReservas(servicioReservas) {
  const router = Router();
  const controlador = crearControladorReservas(servicioReservas);

  router.use(prepararAreaReservas);

  router.get("/", controlador.listarReservas);
  router.get("/nueva", controlador.mostrarFormularioNueva);
  router.get("/:id", controlador.verDetalle);

  router.post("/", validarReserva, controlador.crearReserva);

  return router;
}

module.exports = { crearRutasReservas };
