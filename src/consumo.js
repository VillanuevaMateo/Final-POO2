const Consumo = function (tipo, cantidad, fechaInicio, fechaFin) {
  // --- Validaciones privadas ---
  const validarTipo = (t) => {
    if (t !== "internet" && t !== "llamadas") {
      throw new Error("Tipo de consumo desconocido");
    }
  };

  const validarCantidad = (c) => {
    if (c <= 0) {
      throw new Error("La cantidad a consumir debe ser positiva");
    }
  };

  // Ejecutamos validaciones
  validarTipo(tipo);
  validarCantidad(cantidad);

  // --- Propiedades privadas ---
  let _tipo = tipo;
  let _cantidad = cantidad;
  let _fechaInicio = fechaInicio ?? null;
  let _fechaFin = fechaFin ?? null;

  // Getters privados
  this._getTipo = () => _tipo;
  this._getCantidad = () => _cantidad;
  this._getFechaInicio = () => _fechaInicio;
  this._getFechaFin = () => _fechaFin;
};

// --- Métodos públicos ---
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
