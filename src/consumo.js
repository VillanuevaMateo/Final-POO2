const Consumo = function (
  tipo,
  cantidad,
  fechaInicio,
  fechaFin,
  app = "No especificado"
) {
  // ===== VALIDACIONES INICIALES =====

  if (tipo !== "internet" && tipo !== "llamadas") {
    throw new Error("Tipo de consumo desconocido");
  }

  if (cantidad <= 0) {
    throw new Error("La cantidad a consumir debe ser positiva");
  }

  if (!(fechaInicio instanceof Date) || isNaN(fechaInicio)) {
    throw new Error("La fecha de inicio no es válida");
  }

  if (!(fechaFin instanceof Date) || isNaN(fechaFin)) {
    throw new Error("La fecha de fin no es válida");
  }

  if (fechaFin < fechaInicio) {
    throw new Error("La fecha de fin no puede ser anterior a la fecha de inicio");
  }

  // ===== ESTADO PRIVADO =====
  let _tipo = tipo;
  let _cantidad = cantidad;
  let _fechaInicio = fechaInicio;
  let _fechaFin = fechaFin;
  let _app = app;

  // ===== GETTERS PRIVADOS =====
  this._getTipo = () => _tipo;
  this._getCantidad = () => _cantidad;
  this._getFechaInicio = () => _fechaInicio;
  this._getFechaFin = () => _fechaFin;
  this._getApp = () => _app;
};

// ============================================
//        MÉTODOS PÚBLICOS (PROTOTYPE)
// ============================================

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

Consumo.prototype.getApp = function () {
  return this._getApp();
};

module.exports = Consumo;


