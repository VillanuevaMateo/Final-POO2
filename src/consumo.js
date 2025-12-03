// src/consumo.js
const Consumo = function(tipo, cantidad, fechaInicio, fechaFin) {
  if (tipo !== "internet" && tipo !== "llamadas") {
    throw new Error("Tipo de consumo desconocido");
  }

  if (cantidad <= 0) {
    throw new Error("La cantidad a consumir debe ser positiva");
  }

  // Propiedades privadas
  this._tipo = tipo;
  this._cantidad = cantidad;
  this._fechaInicio = fechaInicio;
  this._fechaFin = fechaFin;
};

// Métodos públicos
Consumo.prototype.getTipo = function() {
  return this._tipo;
};

Consumo.prototype.getCantidad = function() {
  return this._cantidad;
};

Consumo.prototype.getFechaInicio = function() {
  return this._fechaInicio;
};

Consumo.prototype.getFechaFin = function() {
  return this._fechaFin;
};

module.exports = Consumo;
