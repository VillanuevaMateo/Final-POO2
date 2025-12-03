const Cliente = require("../src/Cliente");

describe("Cliente", () => {
  test("debería crearse con nombre completo, número de línea y saldo inicial", () => {
    const cliente = new Cliente("Mateo Villanueva", "1234567890", 500);
    expect(cliente.nombreCompleto).toBe("Mateo Villanueva");
    expect(cliente.numeroLinea).toBe("1234567890");
    expect(cliente.consultarSaldo()).toBe(500);
  });

  test("debería poder consultar saldo inicial correctamente", () => {
    const cliente = new Cliente("Ana Pérez", "0987654321", 200);
    expect(cliente.consultarSaldo()).toBe(200);
  });

  test("debería poder cargar saldo positivo", () => {
    const cliente = new Cliente("Lucas", "111222333", 100);
    cliente.cargarSaldo(50);
    expect(cliente.consultarSaldo()).toBe(150);
  });

  test("no debería permitir cargar saldo negativo", () => {
    const cliente = new Cliente("Sofía", "444555666", 100);
    cliente.cargarSaldo(-50);
    expect(cliente.consultarSaldo()).toBe(100);
  });

  test("debería poder debitar un monto dentro del saldo disponible", () => {
    const cliente = new Cliente("Tomás", "777888999", 200);
    const resultado = cliente.debitarMonto(150);
    expect(resultado).toBe(true);
    expect(cliente.consultarSaldo()).toBe(50);
  });

  test("no debería permitir debitar más que el saldo disponible", () => {
    const cliente = new Cliente("Mía", "000111222", 100);
    const resultado = cliente.debitarMonto(150);
    expect(resultado).toBe(false);
    expect(cliente.consultarSaldo()).toBe(100);
  });

  test("no debería permitir debitar un monto negativo", () => {
    const cliente = new Cliente("Benja", "333444555", 100);
    const resultado = cliente.debitarMonto(-20);
    expect(resultado).toBe(false);
    expect(cliente.consultarSaldo()).toBe(100);
  });
});

