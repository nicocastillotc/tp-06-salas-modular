const SALAS_PERMITIDAS = ["Sala A", "Sala B", "Sala C", "Auditorio"];
const TURNOS_PERMITIDOS = ["Mañana", "Tarde", "Noche"];

function prepararAreaReservas(req, res, next) {
  res.locals.seccion = "Reservas de salas";
  next();
}

function validarReserva(req, res, next) {
  const { estudiante, email, sala, fecha, turno, personas } = req.body;
  const errores = [];

  if (!estudiante || !estudiante.trim())
    errores.push("El nombre del estudiante es obligatorio.");
  if (!email || !email.includes("@"))
    errores.push("Debe ingresar un email válido que contenga '@'.");
  if (!SALAS_PERMITIDAS.includes(sala))
    errores.push("La sala seleccionada no es válida.");
  if (!fecha) errores.push("La fecha de reserva es obligatoria.");
  if (!TURNOS_PERMITIDOS.includes(turno))
    errores.push("El turno seleccionado no es válido.");

  const numPersonas = Number(personas);
  if (!Number.isInteger(numPersonas) || numPersonas < 1 || numPersonas > 6) {
    errores.push(
      "La cantidad de personas deberá ser un número entero entre 1 y 6.",
    );
  }

  if (errores.length > 0) {
    return res.status(400).render("reservas/nueva", {
      titulo: "Nueva Reserva",
      error: errores.join(" "),
      valores: req.body,
      salasPermitidas: SALAS_PERMITIDAS,
      turnosPermitidos: TURNOS_PERMITIDOS,
    });
  }

  req.reservaValidada = {
    estudiante: estudiante.trim(),
    email: email.trim(),
    sala,
    fecha,
    turno,
    personas: numPersonas,
  };

  next();
}

module.exports = { prepararAreaReservas, validarReserva };
