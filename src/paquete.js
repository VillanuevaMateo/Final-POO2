const Paquete = function(gb, minutos, duracionDias, costo) {
    this.gb = gb;
    this.minutos = minutos;
    this.duracionDias = duracionDias;
    this.costo = costo;
    this.fechaCompra = new Date();

    this.estaAgotado = function() {
        return this.gb <= 0 && this.minutos <= 0;
    };

    this.estaVencido = function(fechaActual = new Date()) {
        const fechaVencimiento = new Date(this.fechaCompra);
        fechaVencimiento.setDate(fechaVencimiento.getDate() + this.duracionDias);
        return fechaActual > fechaVencimiento;
    };

    this.descontarConsumo = function(tipo, cantidad) {
        if (cantidad <= 0) return false;

        if (tipo === 'internet') {
            if (cantidad > this.gb) return false;
            this.gb -= cantidad;
            return true;
        }

        if (tipo === 'llamadas') {
            if (cantidad > this.minutos) return false;
            this.minutos -= cantidad;
            return true;
        }

        return false; // tipo desconocido
    };
};

module.exports = Paquete;
