const Cliente = require("../src/Cliente");

describe("creacion de Cliente", () => {
  test("debería crearse con nombre completo, número de línea y saldo inicial", () => {
    const cliente = new Cliente("Mateo Villanueva", "1234567890", 500);
    expect(cliente.nombreCompleto).toBe("Mateo Villanueva");
    expect(cliente.numeroLinea).toBe("1234567890");
    expect(cliente.consultarSaldo()).toBe(500);
  });
});

describe("Cliente y Cuenta Prepago", () => {
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

describe("Cliente y la compra del Paquete", () => {
  test("debería permitir comprar un paquete si no hay activo", () => {
    const cliente = new Cliente("Test", "111", 500);
    const paquete = cliente.comprarPaquete(5, 100, 30, 200);
    expect(paquete.gb()).toBe(5);
    expect(paquete.minutos()).toBe(100);
  });

  test("no debería permitir comprar paquete si ya hay uno activo", () => {
    const cliente = new Cliente("Test", "111", 500);
    cliente.comprarPaquete(5, 100, 30, 200);
    expect(() => cliente.comprarPaquete(3, 50, 15, 100)).toThrow(
      "Ya existe un paquete activo"
    );
  });

  test("no debería permitir comprar paquete si saldo insuficiente", () => {
    const cliente = new Cliente("Test", "111", 50);
    expect(() => cliente.comprarPaquete(5, 100, 30, 100)).toThrow(
      "Saldo insuficiente para comprar el paquete"
    );
  });
});

describe("Cliente consumo de Paquete", () => {
  test("debería descontar correctamente consumo de internet", () => {
    const cliente = new Cliente("Test", "111", 500);
    cliente.comprarPaquete(5, 100, 30, 200);
    cliente.registrarConsumo("internet", 2);
    expect(cliente._getPaquete().gb()).toBe(3);
  });

  test("debería descontar correctamente consumo de minutos", () => {
    const cliente = new Cliente("Test", "111", 500);
    cliente.comprarPaquete(5, 100, 30, 200);
    cliente.registrarConsumo("llamadas", 50);
    expect(cliente._getPaquete().minutos()).toBe(50);
  });

  test("no debería permitir consumo sin paquete activo", () => {
    const cliente = new Cliente("Test", "111", 500);
    expect(() => cliente.registrarConsumo("internet", 1)).toThrow(
      "No hay paquete activo"
    );
  });

  test("no debería permitir consumir más GB que los disponibles", () => {
    const cliente = new Cliente("Test", "111", 500);
    cliente.comprarPaquete(3, 100, 30, 200);
    expect(() => cliente.registrarConsumo("internet", 5)).toThrow(
      "No hay suficientes GB disponibles"
    );
  });

  test("no debería permitir consumir más minutos que los disponibles", () => {
    const cliente = new Cliente("Test", "111", 500);
    cliente.comprarPaquete(5, 50, 30, 200);
    expect(() => cliente.registrarConsumo("llamadas", 100)).toThrow(
      "No hay suficientes minutos disponibles"
    );
  });
});

describe("Cliente y el vencimiento del Paquete", () => {
  test("debería detectar si el paquete está agotado", () => {
    const cliente = new Cliente("Test", "111", 500);
    cliente.comprarPaquete(0, 0, 30, 200);
    expect(cliente._getPaquete().estaAgotado()).toBe(true);
  });

  test("debería detectar si el paquete no está agotado", () => {
    const cliente = new Cliente("Test", "111", 500);
    cliente.comprarPaquete(5, 100, 30, 200);
    expect(cliente._getPaquete().estaAgotado()).toBe(false);
  });

  test("debería detectar si el paquete está vencido usando fecha futura", () => {
    const cliente = new Cliente("Test", "111", 500);
    cliente.comprarPaquete(5, 100, 1, 200);
    const fechaFutura = new Date();
    fechaFutura.setDate(fechaFutura.getDate() + 2);
    expect(cliente._getPaquete().estaVencido(fechaFutura)).toBe(true);
  });

  test("debería detectar si el paquete no está vencido", () => {
    const cliente = new Cliente("Test", "111", 500);
    cliente.comprarPaquete(5, 100, 30, 200);
    expect(cliente._getPaquete().estaVencido()).toBe(false);
  });
});

describe("Cliente y la Renovación automática", () => {
  test("debería renovar automáticamente un paquete agotado si está activada la opción", () => {
    const cliente = new Cliente("Test", "111", 500);
    cliente.comprarPaquete(2, 10, 30, 200, true);
    cliente.registrarConsumo("internet", 2);
    cliente.registrarConsumo("llamadas", 10);
    const paquete = cliente._getPaquete();
    console.log(paquete.gb(), paquete.minutos());
    expect(paquete.gb()).toBe(2);
    expect(paquete.minutos()).toBe(10);
  });
  test("no debería renovar automáticamente un paquete agotado si está desactivada la opción", () => {
    const cliente = new Cliente("Test", "111", 500);
    cliente.comprarPaquete(2, 10, 30, 200, false);
    cliente.registrarConsumo("internet", 2);
    cliente.registrarConsumo("llamadas", 10);
    const paquete = cliente._getPaquete();
    expect(paquete.gb()).toBe(0);
    expect(paquete.minutos()).toBe(0);
  });
});

describe("Cliente y registro de consumos", () => {
  test("debería poder registrar un consumo de internet correctamente", () => {
    const cliente = new Cliente("Test", "111", 500);
    cliente.comprarPaquete(5, 100, 30, 200);

    const consumo = cliente.registrarConsumo(
      "internet",
      2,
      new Date(),
      new Date()
    );

    expect(consumo.getTipo()).toBe("internet");
    expect(consumo.getCantidad()).toBe(2);
    expect(cliente.getHistorialConsumos().length).toBe(1);
  });

  test("debería poder registrar un consumo de llamadas correctamente", () => {
    const cliente = new Cliente("Test", "111", 500);
    cliente.comprarPaquete(5, 100, 30, 200);

    const consumo = cliente.registrarConsumo(
      "llamadas",
      50,
      new Date(),
      new Date()
    );

    expect(consumo.getTipo()).toBe("llamadas");
    expect(consumo.getCantidad()).toBe(50);
    expect(cliente.getHistorialConsumos().length).toBe(1);
  });

  test("no debería permitir registrar un consumo si no hay paquete activo", () => {
    const cliente = new Cliente("Test", "111", 500);

    expect(() =>
      cliente.registrarConsumo("internet", 2, new Date(), new Date())
    ).toThrow("No hay paquete activo");
  });

  test("no debería permitir registrar un consumo mayor al disponible en el paquete", () => {
    const cliente = new Cliente("Test", "111", 500);
    cliente.comprarPaquete(3, 100, 30, 200);

    expect(() =>
      cliente.registrarConsumo("internet", 5, new Date(), new Date())
    ).toThrow("No hay suficientes GB disponibles");

    expect(() =>
      cliente.registrarConsumo("llamadas", 200, new Date(), new Date())
    ).toThrow("No hay suficientes minutos disponibles");
  });

  test("no debería permitir registrar un consumo con cantidad negativa", () => {
    const cliente = new Cliente("Test", "111", 500);
    cliente.comprarPaquete(5, 100, 30, 200);

    expect(() =>
      cliente.registrarConsumo("internet", -5, new Date(), new Date())
    ).toThrow("La cantidad a consumir debe ser positiva");

    expect(() =>
      cliente.registrarConsumo("llamadas", -10, new Date(), new Date())
    ).toThrow("La cantidad a consumir debe ser positiva");
  });

  test("debería guardar los consumos en el historial y permitir filtrarlos por fecha", () => {
    const cliente = new Cliente("Test", "111", 500);
    cliente.comprarPaquete(5, 100, 30, 200);

    const hoy = new Date();
    const ayer = new Date();
    ayer.setDate(ayer.getDate() - 1);

    const consumo1 = cliente.registrarConsumo("internet", 1, ayer, ayer);
    const consumo2 = cliente.registrarConsumo("llamadas", 10, hoy, hoy);

    const historialCompleto = cliente.getHistorialConsumos();
    expect(historialCompleto.length).toBe(2);

    const filtrado = cliente.getHistorialConsumos(ayer, hoy);
    expect(filtrado.length).toBe(2);
  });
});
