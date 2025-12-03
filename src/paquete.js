const Paquete = (function () {
  const Paquete = function (gb, minutos, duracionDias, costo) {
    // variables privadas
    const _fechaCompra = new Date();
    this._getFechaCompra = () => _fechaCompra;

    // Atributos públicos
    this.gb = gb;
    this.minutos = minutos;
    this.duracionDias = duracionDias;
    this.costo = costo;
  };

  // Métodos en el prototipo
  Paquete.prototype.estaAgotado = function () {
    return this.gb <= 0 && this.minutos <= 0;
  };

  Paquete.prototype.estaVencido = function (fechaActual = new Date()) {
    const fechaVencimiento = new Date(this._getFechaCompra());
    fechaVencimiento.setDate(fechaVencimiento.getDate() + this.duracionDias);
    return fechaActual > fechaVencimiento;
  };

  Paquete.prototype.descontarConsumo = function (tipo, cantidad) {
    if (cantidad <= 0)
      throw new Error("La cantidad a consumir debe ser positiva");

    if (tipo === "internet") {
      if (cantidad > this.gb)
        throw new Error("No hay suficientes GB disponibles");
      this.gb -= cantidad;
      return true;
    }

    if (tipo === "llamadas") {
      if (cantidad > this.minutos)
        throw new Error("No hay suficientes minutos disponibles");
      this.minutos -= cantidad;
      return true;
    }

    throw new Error("Tipo de consumo desconocido");
  };

  return Paquete;
})();

module.exports = Paquete;
