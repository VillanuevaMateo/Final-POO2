const Paquete = function (
  gb,
  minutos,
  duracionDias,
  costo,
  appIlimitada = null
) {
  // ===== ESTADO PRIVADO =====
  let _gbIniciales = gb;
  let _minutosIniciales = minutos;
  let _gb = gb;
  let _minutos = minutos;
  let _duracionDias = duracionDias;
  let _costo = costo;
  let _fechaCompra = new Date();
  let _appIlimitada = appIlimitada;

  // ===== GETTERS PRIVADOS =====
  this._getGB = () => _gb;
  this._setGB = (v) => (_gb = v);

  this._getMinutos = () => _minutos;
  this._setMinutos = (v) => (_minutos = v);

  this._getGBIniciales = () => _gbIniciales;
  this._getMinutosIniciales = () => _minutosIniciales;

  this._getDuracionDias = () => _duracionDias;
  this._getCosto = () => _costo;

  this._getFechaCompra = () => _fechaCompra;

  this._getAppIlimitada = () => _appIlimitada;

  this._getVencimiento = () => {
    const fechaVencimiento = new Date(_fechaCompra);
    fechaVencimiento.setDate(fechaVencimiento.getDate() + _duracionDias);
    return fechaVencimiento;
  };

  // ===== VALIDACIONES PRIVADAS =====
  this._validarCantidadPositiva = (cantidad) => {
    if (cantidad <= 0) throw new Error("La cantidad a consumir debe ser positiva");
  };

  this._validarGBDisponibles = (cantidad, app) => {
    if (app !== _appIlimitada && cantidad > _gb)
      throw new Error("No hay suficientes GB disponibles");
  };

  this._validarMinutosDisponibles = (cantidad) => {
    if (cantidad > _minutos)
      throw new Error("No hay suficientes minutos disponibles");
  };
};

// =====================================================
// ================= MÉTODOS PÚBLICOS ===================
// =====================================================

Paquete.prototype.descontarConsumo = function (tipo, cantidad, app) {
  this._validarCantidadPositiva(cantidad);

  if (tipo === "internet") {
    if (app !== this._getAppIlimitada()) {
      this._validarGBDisponibles(cantidad, app);
      this._setGB(this._getGB() - cantidad);
    }
    return true;
  }

  if (tipo === "llamadas") {
    this._validarMinutosDisponibles(cantidad);
    this._setMinutos(this._getMinutos() - cantidad);
    return true;
  }

  throw new Error("Tipo de consumo desconocido");
};

// =====================================================
// ===================== GETTERS ========================
// =====================================================

Paquete.prototype.gb = function () {
  return this._getGB();
};

Paquete.prototype.minutos = function () {
  return this._getMinutos();
};

Paquete.prototype.gbIniciales = function () {
  return this._getGBIniciales();
};

Paquete.prototype.minutosIniciales = function () {
  return this._getMinutosIniciales();
};

Paquete.prototype.duracionDias = function () {
  return this._getDuracionDias();
};

Paquete.prototype.costo = function () {
  return this._getCosto();
};

Paquete.prototype.appIlimitada = function () {
  return this._getAppIlimitada();
};

Paquete.prototype.fechaDeVencimiento = function () {
  return this._getVencimiento();
};

Paquete.prototype.estaAgotado = function () {
  return this._getGB() <= 0 && this._getMinutos() <= 0;
};

Paquete.prototype.estaVencido = function (fechaActual = new Date()) {
  const fechaVencimiento = new Date(this._getFechaCompra());
  fechaVencimiento.setDate(fechaVencimiento.getDate() + this._getDuracionDias());
  return fechaActual > fechaVencimiento;
};

module.exports = Paquete;
