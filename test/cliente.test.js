"use strict";
const Cliente = require('../src/Cliente');
const CuentaPrepago = require('../src/cuentaPrepago');

describe('Cliente', () => {
    test('debería crearse con nombre completo y número de línea', () => {
        const cliente = new Cliente('Mateo Villanueva', '1155555555');
        expect(cliente.nombreCompleto).toBe('Mateo Villanueva');
        expect(cliente.numeroLinea).toBe('1155555555');
    });
    test('debería crearse con una cuenta bancaria con saldo inicial', () => {
        const cliente = new Cliente('Mateo Villanueva', '1155555555', 500);

        expect(cliente.consultarSaldo()).toBe(500);
    });
});
