function crearControladorReservas(servicioReservas) {
  const salasPermitidas = ["Sala A", "Sala B", "Sala C", "Auditorio"];
  const turnosPermitidos = ["Mañana", "Tarde", "Noche"];

  return {
    listarReservas: (req, res) => {
      const reservas = servicioReservas.listar();
      res.render("reservas/lista", {
        titulo: "Listado de Reservas",
        reservas,
      });
    },

    mostrarFormularioNueva: (req, res) => {
      res.render("reservas/nueva", {
        titulo: "Nueva Reserva",
        error: null,
        valores: {},
        salasPermitidas,
        turnosPermitidos,
      });
    },

    verDetalle: (req, res) => {
      const reserva = servicioReservas.buscarPorId(req.params.id);
      if (!reserva) {
        return res.status(404).render("no-encontrado", {
          titulo: "Reserva no encontrada",
        });
      }
      res.render("reservas/detalle", {
        titulo: `Detalle de Reserva #${reserva.id}`,
        reserva,
      });
    },

    crearReserva: (req, res) => {
      servicioReservas.crear(req.reservaValidada);
      res.redirect("/reservas");
    },
  };
}

module.exports = { crearControladorReservas };
