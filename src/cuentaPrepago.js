const CuentaPrepago = (function () {
  const CuentaPrepago = function (saldoInicial = 0) {
    // Variable privada
    const _saldo = { valor: saldoInicial };
    this._getSaldo = () => _saldo;
  };

  // Métodos en el prototipo
  CuentaPrepago.prototype.consultarSaldo = function () {
    return this._getSaldo().valor;
  };

  CuentaPrepago.prototype.cargarSaldo = function (monto) {
    if (monto > 0) this._getSaldo().valor += monto;
  };

  CuentaPrepago.prototype.debitarMonto = function (monto) {
    const saldoObj = this._getSaldo();
    if (monto > 0 && monto <= saldoObj.valor) {
      saldoObj.valor -= monto;
      return true;
    }
    return false;
  };

  return CuentaPrepago;
})();

module.exports = CuentaPrepago;
