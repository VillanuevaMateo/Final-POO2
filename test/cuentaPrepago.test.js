"use strict";
const CuentaPrepago = require('../src/cuentaPrepago');

describe('Cuenta Prepago', () => {
    test('debería crearse con saldo inicial', () => {
        const cuentaPrepago = new CuentaPrepago(100);
        expect(cuentaPrepago.saldo).toBe(100);
    });
});
