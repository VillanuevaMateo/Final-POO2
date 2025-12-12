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

  const _historialConsumos = [];
  this._getHistorialConsumos = () => _historialConsumos;

  // ----------------------------------------
  //  ATRIBUTOS PRIVADOS: PRÉSTAMOS
  // ----------------------------------------

  const _historialPrestamosOtorgados = [];
  const _historialPrestamosRecibidos = [];

  this._getPrestamosOtorgados = () => _historialPrestamosOtorgados;
  this._getPrestamosRecibidos = () => _historialPrestamosRecibidos;

  this._registrarPrestamoOtorgado = (prestamo) => {
    _historialPrestamosOtorgados.push(prestamo);
  };

  this._registrarPrestamoRecibido = (prestamo) => {
    _historialPrestamosRecibidos.push(prestamo);
  };

  // -------------------------
  //      MÉTODOS PRIVADOS
  // -------------------------

  const _tienePaqueteActivo = () => {
    return _paquete && !_paquete.estaAgotado() && !_paquete.estaVencido();
  };

  this._puedeComprarPaquete = () => !_tienePaqueteActivo();

  this._registrarConsumoEnHistorial = (consumo) => {
    _historialConsumos.push(consumo);
  };
  
this.tienePaqueteActivo = () => _tienePaqueteActivo();
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
  fechaInicio = new Date(),
  fechaFin = fechaInicio,
  app = "Navegador"
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

// ---------------------------------------
//     MÉTODOS PÚBLICOS
// ---------------------------------------

Cliente.prototype.getPaqueteActual = function () {
  return this._getPaquete();
};

Cliente.prototype.tienePaqueteVigente = function () {
  const paquete = this._getPaquete();
  return paquete && !paquete.estaAgotado() && !paquete.estaVencido();
};

Cliente.prototype.getPrestamosRecibidos = function () {
  return this._getPrestamosRecibidos();
};

Cliente.prototype.getPrestamosOtorgados = function () {
  return this._getPrestamosOtorgados();
};

Cliente.prototype.getPrestamosRecibidosVigentes = function (fecha = new Date()) {
  return this._getPrestamosRecibidos().filter((p) => {
    if (!p) return false;

    if (typeof p.estaVigente === "function") {
      return p.estaVigente();
    }
    if (typeof p.estaVigenteEn === "function") {
      return p.estaVigenteEn(fecha);
    }
    // fallback: if has estaVencidoEn and estaAgotado
    if (typeof p.estaVencidoEn === "function") {
      const vencido = p.estaVencidoEn(fecha);
      const agotado = typeof p.estaAgotado === "function" ? p.estaAgotado() : p.getCantidad && p.getCantidad() === 0;
      return !vencido && !agotado;
    }
    return true;
  });
};


Cliente.prototype.tienePrestamoVigente = function () {
  return this.getPrestamosRecibidosVigentes().length > 0;
};

Cliente.prototype._getPrestamosRecibidosPublic = function () {
  return this._getPrestamosRecibidos();
};

Cliente.prototype._getPrestamosOtorgadosPublic = function () {
  return this._getPrestamosOtorgados();
};

module.exports = Cliente;
