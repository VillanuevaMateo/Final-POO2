"use strict";
const Cliente = require('../src/Cliente');

describe('Cliente', () => {
    test('debería crearse con nombre completo y número de línea', () => {
        const cliente = new Cliente('Mateo Villanueva', '1155555555');
        expect(cliente.nombreCompleto).toBe('Mateo Villanueva');
        expect(cliente.numeroLinea).toBe('1155555555');
    });
});
