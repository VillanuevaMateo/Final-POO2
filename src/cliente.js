const CuentaPrepago = require("./cuentaPrepago");

const Cliente = function(nombreCompleto, numeroLinea, saldoInicial = 0) {
  this.nombreCompleto = nombreCompleto;
  this.numeroLinea = numeroLinea;

  // Cuenta prepago privada mediante closure
  const cuenta = new CuentaPrepago(saldoInicial);

  // Expositor interno para acceder desde el prototipo
  this._getCuenta = () => cuenta;
};

// Métodos públicos en el prototipo que delegan en la cuenta prepago
Cliente.prototype.consultarSaldo = function() {
  return this._getCuenta().consultarSaldo();
};

Cliente.prototype.cargarSaldo = function(monto) {
  this._getCuenta().cargarSaldo(monto);
};

Cliente.prototype.debitarMonto = function(monto) {
  return this._getCuenta().debitarMonto(monto);
};

module.exports = Cliente;
