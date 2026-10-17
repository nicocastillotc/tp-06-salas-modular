function crearServicioReservas(datosIniciales = []) {
  let reservas = [...datosIniciales];

  return {
    listar: () => reservas,

    buscarPorId: (id) => reservas.find((r) => r.id === Number(id)),

    contar: () => reservas.length,

    crear: (nuevaReservaData) => {
      const nuevoId =
        reservas.length > 0 ? Math.max(...reservas.map((r) => r.id)) + 1 : 1;
      const reservaCreada = {
        id: nuevoId,
        ...nuevaReservaData,
        creadoEn: new Date().toISOString(),
      };
      reservas.push(reservaCreada);
      return reservaCreada;
    },
  };
}

module.exports = { crearServicioReservas };
