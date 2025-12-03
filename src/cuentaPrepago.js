const CuentaPrepago = function (saldoInicial = 0) {
  this.saldo = saldoInicial;

  this.consultarSaldo = function () {
    return this.saldo;
  };

  this.cargarSaldo = function (monto) {
    if (monto > 0) {
      this.saldo += monto;
    }
  };

  this.debitarMonto = function (monto) {
    if (monto > 0 && monto <= this.saldo) {
      this.saldo -= monto;
      return true;
    }
    return false;
  };
};
module.exports = CuentaPrepago;
