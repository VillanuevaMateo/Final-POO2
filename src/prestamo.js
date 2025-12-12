const Prestamo = function (
  tipo,
  cantidad,
  fechaInicio,
  fechaVencimiento,
  donante,
  receptor
) {
  // -------------------------
  //    VALIDACIONES BÁSICAS
  // -------------------------

  if (tipo !== "internet" && tipo !== "llamadas") {
    throw new Error("Tipo de préstamo inválido");
  }

  if (cantidad <= 0) {
    throw new Error("La cantidad del préstamo debe ser positiva");
  }

  if (!(fechaInicio instanceof Date) || !(fechaVencimiento instanceof Date)) {
    throw new Error("Las fechas deben ser instancias de Date");
  }

  if (fechaVencimiento < fechaInicio) {
    throw new Error("La fecha de vencimiento no puede ser anterior al inicio");
  }

  // -------------------------
  //     ATRIBUTOS PRIVADOS
  // -------------------------

  let _tipo = tipo;
  let _cantidad = cantidad;
  let _inicio = fechaInicio;
  let _vencimiento = fechaVencimiento;
  let _donante = donante;
  let _receptor = receptor;
  let _cantidadRestante = cantidad;

  // -------------------------
  //     GETTERS PRIVADOS
  // -------------------------

  this._getTipo = () => _tipo;
  this._getCantidad = () => _cantidad;
  this._getCantidadRestante = () => _cantidadRestante;
  this._getInicio = () => _inicio;
  this._getVencimiento = () => _vencimiento;
  this._getDonante = () => _donante;
  this._getReceptor = () => _receptor;

  this._descontar = (valor) => {
    if (valor <= 0) throw new Error("El consumo debe ser positivo");
    if (valor > _cantidadRestante)
      throw new Error("No hay suficiente crédito disponible en el préstamo");

    _cantidadRestante -= valor;
  };
};

// ---------------------------------------
//         MÉTODOS PÚBLICOS
// ---------------------------------------

Prestamo.prototype.tipoPrestamo = function () {
  return this._getTipo();
};

Prestamo.prototype.cantidadPrestada = function () {
  return this._getCantidad();
};

Prestamo.prototype.cantidadRestante = function () {
  return this._getCantidadRestante();
};

Prestamo.prototype.fechaDeInicio = function () {
  return this._getInicio();
};

Prestamo.prototype.fechaDeVencimiento = function () {
  return this._getVencimiento();
};

Prestamo.prototype.getDonante = function () {
  return this._getDonante();
};

Prestamo.prototype.getReceptor = function () {
  return this._getReceptor();
};

Prestamo.prototype.estaAgotado = function () {
  return this._getCantidadRestante() <= 0;
};

Prestamo.prototype.estaVencidoEn = function (fecha) {
  return fecha >= this._getVencimiento();
};

Prestamo.prototype.estaVigente = function (fecha = new Date()) {
  return !this.estaAgotado() && !this.estaVencidoEn(fecha);
};

Prestamo.prototype.descontar = function (valor) {
  this._descontar(valor);
};

module.exports = Prestamo;
