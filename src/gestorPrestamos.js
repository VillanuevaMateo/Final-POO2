const Prestamo = require("./prestamo");

const GestorPrestamos = function () {

};

// ---------------------------------------
//            MÉTODO PRINCIPAL
// ---------------------------------------

GestorPrestamos.prototype.otorgarPrestamo = function (
  donante,
  receptor,
  tipo,
  cantidad
) {
  const paqueteDonante = donante._getPaquete();
  if (!paqueteDonante) {
    throw new Error("El donante no tiene un paquete activo");
  }

  if (this._tienePrestamoVigente(receptor)) {
    throw new Error("El receptor ya tiene un préstamo vigente");
  }

  if (tipo === "internet" && paqueteDonante.gb() < cantidad) {
    throw new Error("El donante no tiene suficientes GB para prestar");
  }

  if (tipo === "llamadas" && paqueteDonante.minutos() < cantidad) {
    throw new Error("El donante no tiene suficientes minutos para prestar");
  }

  const fechaInicio = new Date();
  const fechaVencimiento = this._calcularFechaVencimientoPaquete(
    paqueteDonante
  );

  const prestamo = new Prestamo(
    tipo,
    cantidad,
    fechaInicio,
    fechaVencimiento,
    donante,
    receptor
  );

  donante._registrarPrestamoOtorgado(prestamo);
  receptor._registrarPrestamoRecibido(prestamo);

  return prestamo;
};

// ---------------------------------------
//         MÉTODOS PRIVADOS
// ---------------------------------------

GestorPrestamos.prototype._tienePrestamoVigente = function (cliente) {
  const recibidos = cliente._getPrestamosRecibidos();

  return recibidos.some((p) => p.estaVigente());
};

GestorPrestamos.prototype._calcularFechaVencimientoPaquete = function (
  paquete
) {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + paquete.duracionDias());
  return fecha;
};

module.exports = GestorPrestamos;
