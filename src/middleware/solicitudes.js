let contadorSolicitudes = 1;

function identificarSolicitud(req, res, next) {
  const idStr = String(contadorSolicitudes).padStart(4, "0");
  res.locals.solicitudId = `BIB-${idStr}`;
  contadorSolicitudes++;
  next();
}

function medirDuracion(req, res, next) {
  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const end = process.hrtime.bigint();
    const duracionMs = Number(end - start) / 1_000_000;
    console.log(
      `[${res.locals.solicitudId || "BIB-XXXX"}] ${req.method} ${req.originalUrl} - Status: ${res.statusCode} - ${duracionMs.toFixed(2)}ms`,
    );
  });

  next();
}

module.exports = { identificarSolicitud, medirDuracion };
