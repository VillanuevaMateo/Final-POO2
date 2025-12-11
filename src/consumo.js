
const Consumo = function(tipo, cantidad, fechaInicio, fechaFin, app = "No especificado") {
  // Validaciones generales
  if (tipo !== "internet" && tipo !== "llamadas") {
    throw new Error("Tipo de consumo desconocido");
  }
  if (cantidad <= 0) {
    throw new Error("La cantidad a consumir debe ser positiva");
  }

    // Variables privadas
  let _cantidad = cantidad;
  let _fechaInicio = fechaInicio;
  let _fechaFin = fechaFin;
  let _app = app;
  let _tipo = tipo;

  // Getters públicos
  this.getTipo = () => _tipo;
  this.getCantidad = () => _cantidad;
  this.getFechaInicio = () => _fechaInicio;
  this.getFechaFin = () => _fechaFin;
  this.getApp = () => _app;
};

module.exports = Consumo;

