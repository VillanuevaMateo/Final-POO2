const Paquete = require("./paquete");
const Consumo = require("./consumo");
const CuentaPrepago = require("./cuentaPrepago");

const Cliente = function (nombreCompleto, numeroLinea, saldoInicial = 0) {
  this.nombreCompleto = nombreCompleto;
  this.numeroLinea = numeroLinea;

  // -------------------------
  //   ATRIBUTOS PRIVADOS
  // -------------------------

  const _cuenta = new CuentaPrepago(saldoInicial);
  this._getCuenta = () => _cuenta;

  let _paquete = null;
  let _renovacionAutomatica = false;

  this._getPaquete = () => _paquete;

  this._setPaquete = (paquete, renovar) => {
    _paquete = paquete;
    _renovacionAutomatica = renovar;
  };

  this._getRenovacionAutomatica = () => _renovacionAutomatica;

  // Historial de consumos
  const _historialConsumos = [];
  this._getHistorialConsumos = () => _historialConsumos;

  // -------------------------
  //      MÉTODOS PRIVADOS
  // -------------------------

  // Paquete activo → no agotado y no vencido
  const _tienePaqueteActivo = () => {
    return _paquete && !_paquete.estaAgotado() && !_paquete.estaVencido();
  };

  this._puedeComprarPaquete = () => !_tienePaqueteActivo();

  this._registrarConsumoEnHistorial = (consumo) => {
    _historialConsumos.push(consumo);
  };
};

// ---------------------------------------
//   MÉTODOS DE LA CUENTA PREPAGO
// ---------------------------------------

Cliente.prototype.consultarSaldo = function () {
  return this._getCuenta().consultarSaldo();
};

Cliente.prototype.cargarSaldo = function (monto) {
  this._getCuenta().cargarSaldo(monto);
};

Cliente.prototype.debitarMonto = function (monto) {
  return this._getCuenta().debitarMonto(monto);
};

// ---------------------------------------
//          COMPRAR PAQUETE
// ---------------------------------------

Cliente.prototype.comprarPaquete = function (
  gb,
  minutos,
  duracionDias,
  costo,
  renovar = false
) {
  const cuenta = this._getCuenta();

  if (!this._puedeComprarPaquete()) {
    throw new Error("Ya existe un paquete activo");
  }

  if (!cuenta.debitarMonto(costo)) {
    throw new Error("Saldo insuficiente para comprar el paquete");
  }

  const nuevoPaquete = new Paquete(gb, minutos, duracionDias, costo);
  this._setPaquete(nuevoPaquete, renovar);

  return nuevoPaquete;
};

// ---------------------------------------
//          REGISTRAR CONSUMO
// ---------------------------------------

Cliente.prototype.registrarConsumo = function (
  tipo,
  cantidad,
  fechaInicio,
  fechaFin,
  app = 'Navegador'
) {
  const paqueteActual = this._getPaquete();
  if (!paqueteActual) {
    throw new Error("No hay paquete activo");
  }

  paqueteActual.descontarConsumo(tipo, cantidad, app);
  const consumo = new Consumo(tipo, cantidad, fechaInicio, fechaFin, app);
  this._registrarConsumoEnHistorial(consumo);

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

  return consumo;
};

// ---------------------------------------
//       HISTORIAL DE CONSUMOS
// ---------------------------------------

Cliente.prototype.getHistorialConsumos = function (fechaInicio, fechaFin) {
  let historial = this._getHistorialConsumos();

  if (fechaInicio) {
    historial = historial.filter((c) => c.getFechaInicio() >= fechaInicio);
  }
  if (fechaFin) {
    historial = historial.filter((c) => c.getFechaInicio() <= fechaFin);
  }

  return historial;
};

module.exports = Cliente;
