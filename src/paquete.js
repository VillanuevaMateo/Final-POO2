const Paquete = function(gb, minutos, duracionDias, costo) {
    this.gb = gb;
    this.minutos = minutos;
    this.duracionDias = duracionDias;
    this.costo = costo;
    this.fechaCompra = new Date();
}

module.exports = Paquete;