const Consumo = function (tipo, cantidad, fechaInicio, fechaFin) {
  if (tipo !== "internet" && tipo !== "llamadas") {
    throw new Error("Tipo de consumo desconocido");
  }
  if (cantidad <= 0) {
    throw new Error("La cantidad a consumir debe ser positiva");
  }

  // Propiedades privadas usando closure
  let _tipo = tipo;
  let _cantidad = cantidad;
  let _fechaInicio = fechaInicio;
  let _fechaFin = fechaFin;

  // Getters privados para usar desde prototype
  this._getTipo = () => _tipo;
  this._getCantidad = () => _cantidad;
  this._getFechaInicio = () => _fechaInicio;
  this._getFechaFin = () => _fechaFin;
};

// Métodos públicos en el prototype
Consumo.prototype.getTipo = function () {
  return this._getTipo();
};

Consumo.prototype.getCantidad = function () {
  return this._getCantidad();
};

Consumo.prototype.getFechaInicio = function () {
  return this._getFechaInicio();
};

Consumo.prototype.getFechaFin = function () {
  return this._getFechaFin();
};

module.exports = Consumo;
