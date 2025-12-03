"use strict";
const CuentaPrepago = require('../src/cuentaPrepago');

describe('Cuenta Prepago', () => {
    test('debería crearse con saldo inicial', () => {
        const cuentaPrepago = new CuentaPrepago(100);
        expect(cuentaPrepago.consultarSaldo()).toBe(100);
    });

    test('debería permitir cargar saldo positivo', () => {
        const cuenta = new CuentaPrepago(200);
        cuenta.cargarSaldo(300);
        expect(cuenta.consultarSaldo()).toBe(500);
    });

    test('no debería permitir debitar más del saldo disponible', () => {
        const cuenta = new CuentaPrepago(200);
        const resultado = cuenta.debitarMonto(300);
        expect(resultado).toBe(false);
        expect(cuenta.consultarSaldo()).toBe(200);
    });

    test('debería debitar correctamente si hay saldo suficiente', () => {
        const cuenta = new CuentaPrepago(500);
        const resultado = cuenta.debitarMonto(200);
        expect(resultado).toBe(true);
        expect(cuenta.consultarSaldo()).toBe(300);
    });
    test('no debería permitir cargar un monto negativo', () => {
    const cuenta = new CuentaPrepago(500);
    cuenta.cargarSaldo(-200);
    expect(cuenta.consultarSaldo()).toBe(500);
});

test('no debería permitir debitar si no hay saldo suficiente', () => {
    const cuenta = new CuentaPrepago(100);
    const resultado = cuenta.debitarMonto(200);
    expect(resultado).toBe(false);
    expect(cuenta.consultarSaldo()).toBe(100);
});

test('no debería permitir debitar un monto negativo', () => {
    const cuenta = new CuentaPrepago(500);
    const resultado = cuenta.debitarMonto(-100);
    expect(resultado).toBe(false);
    expect(cuenta.consultarSaldo()).toBe(500);
});
});
