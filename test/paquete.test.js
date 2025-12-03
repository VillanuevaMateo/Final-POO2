const Paquete = require('../src/paquete');

describe('Paquete', () => {
    test('debería crearse con GB, minutos, duración y costo', () => {
        const paquete = new Paquete(2.5, 1000, 30, 400);

        expect(paquete.gb).toBe(2.5);
        expect(paquete.minutos).toBe(1000);
        expect(paquete.duracionDias).toBe(30);
        expect(paquete.costo).toBe(400);
        expect(paquete.fechaCompra).toBeDefined();
    });
});
