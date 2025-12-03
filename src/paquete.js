const Paquete = function (gb, minutos, duracionDias, costo) {
  // Variables privadas
  let _gbIniciales = gb;
  let _minutosIniciales = minutos;
  let _gb = gb;
  let _minutos = minutos;
  let _duracionDias = duracionDias;
  let _costo = costo;
  let _fechaCompra = new Date();

  // Funciones privadas de validación
  const validarCantidadPositiva = (cantidad) => {
    if (cantidad <= 0) throw new Error("La cantidad a consumir debe ser positiva");
  };

  const validarGBDisponibles = (cantidad) => {
    if (cantidad > _gb) throw new Error("No hay suficientes GB disponibles");
  };

  const validarMinutosDisponibles = (cantidad) => {
    if (cantidad > _minutos) throw new Error("No hay suficientes minutos disponibles");
  };

  // Métodos públicos
  this.descontarConsumo = function (tipo, cantidad) {
    validarCantidadPositiva(cantidad);

    if (tipo === "internet") {
      validarGBDisponibles(cantidad);
      _gb -= cantidad;
      return true;
    }

    if (tipo === "llamadas") {
      validarMinutosDisponibles(cantidad);
      _minutos -= cantidad;
      return true;
    }

    throw new Error("Tipo de consumo desconocido");
  };

  // Getters
  this.gb = () => _gb;
  this.minutos = () => _minutos;
  this.gbIniciales = () => _gbIniciales;
  this.minutosIniciales = () => _minutosIniciales;
  this.duracionDias = () => _duracionDias;
  this.costo = () => _costo;

  this.estaAgotado = () => _gb <= 0 && _minutos <= 0;

  this.estaVencido = (fechaActual = new Date()) => {
    const fechaVencimiento = new Date(_fechaCompra);
    fechaVencimiento.setDate(fechaVencimiento.getDate() + _duracionDias);
    return fechaActual > fechaVencimiento;
  };
};

module.exports = Paquete;