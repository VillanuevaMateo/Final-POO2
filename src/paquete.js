const Paquete = (function () {
  const Paquete = function (gb, minutos, duracionDias, costo) {
    // Variable privada
    function crearFechaCompra() {
      const fechaCompra = new Date();

      return {
        estaVencido: (fechaActual = new Date()) => {
          const fechaVencimiento = new Date(fechaCompra);
          fechaVencimiento.setDate(fechaVencimiento.getDate() + duracionDias);
          return fechaActual > fechaVencimiento;
        }
      };
    }

    const privado = crearFechaCompra();

    // Atributos públicos
    this.gb = gb;
    this.minutos = minutos;
    this.duracionDias = duracionDias;
    this.costo = costo;

    // Métodos públicos
    this.estaAgotado = () => this.gb <= 0 && this.minutos <= 0;
    this.estaVencido = privado.estaVencido;

    this.descontarConsumo = (tipo, cantidad) => {
      if (cantidad <= 0)
        throw new Error("La cantidad a consumir debe ser positiva");

      if (tipo === "internet") {
        if (cantidad > this.gb) throw new Error("No hay suficientes GB disponibles");
        this.gb -= cantidad;
        return true;
      }

      if (tipo === "llamadas") {
        if (cantidad > this.minutos)
          throw new Error("No hay suficientes minutos disponibles");
        this.minutos -= cantidad;
        return true;
      }

      throw new Error("Tipo de consumo desconocido");
    };
  };

  return Paquete;
})();

module.exports = Paquete;
