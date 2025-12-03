const CuentaPrepago = (function () {
  const CuentaPrepago = function (saldoInicial = 0) {
    // Variable "privada" por closure
    function crearSaldo() {
      let saldo = saldoInicial;

      return {
        consultarSaldo: () => saldo,
        cargarSaldo: (monto) => { if (monto > 0) saldo += monto; },
        debitarMonto: (monto) => {
          if (monto > 0 && monto <= saldo) {
            saldo -= monto;
            return true;
          }
          return false;
        }
      };
    }

    // Exponer métodos públicos
    const metodos = crearSaldo();
    this.consultarSaldo = metodos.consultarSaldo;
    this.cargarSaldo = metodos.cargarSaldo;
    this.debitarMonto = metodos.debitarMonto;
  };

  return CuentaPrepago;
})(); 

module.exports = CuentaPrepago;
