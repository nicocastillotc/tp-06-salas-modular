const path = require("path");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");

const {
  identificarSolicitud,
  medirDuracion,
} = require("./middleware/solicitudes");
const { crearRutasReservas } = require("./rutas/reservas");

function crearApp(config, servicioReservas) {
  const app = express();

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "..", "views"));
  app.set("layout", "layouts/main");

  app.use(morgan(config.morganFormat));
  app.use(identificarSolicitud);
  app.use(medirDuracion);
  app.use(expressLayouts);

  app.use(express.static(path.join(__dirname, "..", "public")));

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.get("/", (req, res) => {
    res.render("inicio", { titulo: "Inicio - Sistema de Reservas" });
  });

  app.get("/estado", (req, res) => {
    res.json({
      estado: "OK",
      servidor: "Activo",
      totalReservas: servicioReservas.contar(),
      solicitudId: res.locals.solicitudId,
    });
  });

  app.use("/reservas", crearRutasReservas(servicioReservas));

  app.use((req, res) => {
    res.status(404).render("no-encontrado", {
      titulo: "Página no encontrada",
    });
  });

  return app;
}

module.exports = { crearApp };
