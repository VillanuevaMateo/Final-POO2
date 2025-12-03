const Paquete = require("./paquete");
const Consumo = require("./consumo");

const Cliente = function(nombreCompleto, numeroLinea, saldoInicial = 0) {
  this.nombreCompleto = nombreCompleto;
  this.numeroLinea = numeroLinea;

  // Cuenta prepago privada
  const _cuenta = new (require("./cuentaPrepago"))(saldoInicial);
  this._getCuenta = () => _cuenta;

  // Paquete privado
  let _paquete = null;
  let _renovacionAutomatica = false;
  this._getPaquete = () => _paquete;
  this._setPaquete = (paquete, renovar) => {
    _paquete = paquete;
    _renovacionAutomatica = renovar;
  };
  this._getRenovacionAutomatica = () => _renovacionAutomatica;

  // Historial de consumos privado
  const _historialConsumos = [];
  this._getHistorialConsumos = () => _historialConsumos;
};

// Métodos de la cuenta prepago
Cliente.prototype.consultarSaldo = function() {
  return this._getCuenta().consultarSaldo();
};

Cliente.prototype.cargarSaldo = function(monto) {
  this._getCuenta().cargarSaldo(monto);
};

Cliente.prototype.debitarMonto = function(monto) {
  return this._getCuenta().debitarMonto(monto);
};

// Comprar paquete
Cliente.prototype.comprarPaquete = function(
  gb,
  minutos,
  duracionDias,
  costo,
  renovar = false
) {
  const paqueteActual = this._getPaquete();
  const cuenta = this._getCuenta();

  if (paqueteActual && !paqueteActual.estaAgotado() && !paqueteActual.estaVencido()) {
    throw new Error("Ya existe un paquete activo");
  }

  if (!cuenta.debitarMonto(costo)) {
    throw new Error("Saldo insuficiente para comprar el paquete");
  }

  const nuevoPaquete = new Paquete(gb, minutos, duracionDias, costo);
  this._setPaquete(nuevoPaquete, renovar);
  return nuevoPaquete;
};

// Descontar consumo y registrar en historial
Cliente.prototype.registrarConsumo = function(tipo, cantidad, fechaInicio, fechaFin) {
  const paqueteActual = this._getPaquete();
  if (!paqueteActual) throw new Error("No hay paquete activo");

  // Descontar del paquete (lanza errores si no se puede)
  paqueteActual.descontarConsumo(tipo, cantidad);

  // Crear un consumo y guardarlo en el historial
  const consumo = new Consumo(tipo, cantidad, fechaInicio, fechaFin);
  this._getHistorialConsumos().push(consumo);

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

// Obtener historial de consumos, opcionalmente filtrado por fechas
Cliente.prototype.getHistorialConsumos = function(fechaInicio, fechaFin) {
  let historial = this._getHistorialConsumos();

  if (fechaInicio) {
    historial = historial.filter(c => c.getFechaInicio() >= fechaInicio);
  }
  if (fechaFin) {
    historial = historial.filter(c => c.getFechaInicio() <= fechaFin);
  }

  return historial;
};

module.exports = Cliente;
