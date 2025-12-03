const CuentaPrepago = require('./cuentaPrepago');

const Cliente = function(nombreCompleto, numeroLinea, saldoInicial) {
    
    this.nombreCompleto = nombreCompleto;
    this.numeroLinea = numeroLinea;
    this.cuentaPrepago = new CuentaPrepago(saldoInicial);
    
}

module.exports = Cliente;
