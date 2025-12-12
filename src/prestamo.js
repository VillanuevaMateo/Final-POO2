const Prestamo = function (tipo, cantidad, fechaInicio, fechaVencimiento, donante, receptor) {
  
  // -------------------------
  //     ATRIBUTOS PRIVADOS
  // -------------------------

  let _tipo = tipo;
  let _cantidad = cantidad;
  let _inicio = fechaInicio;
  let _vencimiento = fechaVencimiento;
  let _donante = donante;
  let _receptor = receptor;

  this._getTipo = () => _tipo;
  this._getCantidad = () => _cantidad;
  this._getInicio = () => _inicio;
  this._getVencimiento = () => _vencimiento;
  this._getDonante = () => _donante;
  this._getReceptor = () => _receptor;
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

Prestamo.prototype.estaVencidoEn = function (fecha) {
  return fecha >= this._getVencimiento();
};

module.exports = Prestamo;
