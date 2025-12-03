const Paquete = function (gb, minutos, duracionDias, costo) {
  const _gbIniciales = gb;
  const _minutosIniciales = minutos;
  let _gb = gb;
  let _minutos = minutos;
  const _duracionDias = duracionDias;
  const _costo = costo;
  const _fechaCompra = new Date();

  // -------- Métodos privados --------
  const estaAgotadoPriv = () => _gb <= 0 && _minutos <= 0;

  const estaVencidoPriv = (fechaActual = new Date()) => {
    const fechaVencimiento = new Date(_fechaCompra);
    fechaVencimiento.setDate(fechaVencimiento.getDate() + _duracionDias);
    return fechaActual > fechaVencimiento;
  };

  const descontarConsumoPriv = (tipo, cantidad) => {
    if (cantidad <= 0)
      throw new Error("La cantidad a consumir debe ser positiva");

    if (tipo === "internet") {
      if (cantidad > _gb) throw new Error("No hay suficientes GB disponibles");
      _gb -= cantidad;
      return true;
    }

    if (tipo === "llamadas") {
      if (cantidad > _minutos)
        throw new Error("No hay suficientes minutos disponibles");
      _minutos -= cantidad;
      return true;
    }

    throw new Error("Tipo de consumo desconocido");
  };

  // -------- Getters públicos --------
  this.gb = () => _gb;
  this.minutos = () => _minutos;
  this.duracionDias = () => _duracionDias;
  this.costo = () => _costo;
  this.fechaCompra = () => _fechaCompra;
  this.gbIniciales = () => _gbIniciales;
  this.minutosIniciales = () => _minutosIniciales;
  this.estaAgotado = () => estaAgotadoPriv();
  this.estaVencido = (fechaActual) => estaVencidoPriv(fechaActual);
  this.descontarConsumo = (tipo, cantidad) =>
    descontarConsumoPriv(tipo, cantidad);
};

module.exports = Paquete;
