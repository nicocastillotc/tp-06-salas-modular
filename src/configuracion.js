function cargarConfiguracion() {
  const nodeEnv = process.env.NODE_ENV || "development";
  const portEnv = process.env.PORT;

  let port = 3000;

  if (portEnv !== undefined) {
    const parsedPort = Number(portEnv);
    if (!Number.isInteger(parsedPort) || parsedPort < 1 || parsedPort > 65535) {
      throw new Error(
        `[Configuración] Puerto inválido "${portEnv}". Debe ser un número entero entre 1 y 65535.`,
      );
    }
    port = parsedPort;
  }

  return {
    port,
    nodeEnv,
    morganFormat: nodeEnv === "production" ? "combined" : "dev",
  };
}

module.exports = { cargarConfiguracion };
