const CuentaPrepago = require("./cuentaPrepago");
const Paquete = require("./paquete");

const Cliente = function (nombreCompleto, numeroLinea, saldoInicial = 0) {
  this.nombreCompleto = nombreCompleto;
  this.numeroLinea = numeroLinea;

  // Cuenta prepago privada
  const cuenta = new CuentaPrepago(saldoInicial);
  this._getCuenta = () => cuenta;

  // Paquete privado y flag de renovación automática
  let paqueteActual = null;
  let renovacionAutomatica = false;

  this._getPaquete = () => paqueteActual;
  this._getRenovacionAutomatica = () => renovacionAutomatica;

  this._setPaquete = (nuevoPaquete, renovar = false) => {
    paqueteActual = nuevoPaquete;
    renovacionAutomatica = renovar;
  };
};

// Métodos de la cuenta en prototipo

Cliente.prototype.consultarSaldo = function () {
  return this._getCuenta().consultarSaldo();
};

Cliente.prototype.cargarSaldo = function (monto) {
  this._getCuenta().cargarSaldo(monto);
};

Cliente.prototype.debitarMonto = function (monto) {
  return this._getCuenta().debitarMonto(monto);
};

// Métodos del paquete en prototipo

Cliente.prototype.comprarPaquete = function (
  gb,
  minutos,
  duracionDias,
  costo,
  renovar = false
) {
  const paqueteActual = this._getPaquete();
  const cuenta = this._getCuenta();

  if (
    paqueteActual &&
    !paqueteActual.estaAgotado() &&
    !paqueteActual.estaVencido()
  ) {
    throw new Error("Ya existe un paquete activo");
  }

  if (!cuenta.debitarMonto(costo)) {
    throw new Error("Saldo insuficiente para comprar el paquete");
  }

  const nuevoPaquete = new Paquete(gb, minutos, duracionDias, costo);
  this._setPaquete(nuevoPaquete, renovar);
  return nuevoPaquete;
};

Cliente.prototype.descontarConsumo = function (tipo, cantidad) {
  const paqueteActual = this._getPaquete();
  if (!paqueteActual) throw new Error("No hay paquete activo");

  const resultado = paqueteActual.descontarConsumo(tipo, cantidad);

  // Renovación automática
  if (
    this._getRenovacionAutomatica() &&
    (paqueteActual.estaAgotado() || paqueteActual.estaVencido())
  ) {
    this.comprarPaquete(
      paqueteActual.gbIniciales(),
      paqueteActual.minutosIniciales(),
      paqueteActual.duracionDias(),
      paqueteActual.costo(),
      true
    );
  }

  return resultado;
};

Cliente.prototype.estaPaqueteAgotado = function () {
  const paqueteActual = this._getPaquete();
  if (!paqueteActual) return true;
  return paqueteActual.estaAgotado();
};

Cliente.prototype.estaPaqueteVencido = function () {
  const paqueteActual = this._getPaquete();
  if (!paqueteActual) return true;
  return paqueteActual.estaVencido();
};

module.exports = Cliente;
