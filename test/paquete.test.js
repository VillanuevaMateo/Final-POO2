const Paquete = require("../src/paquete");

describe("Paquete", () => {
  test("debería crearse con GB, minutos, duración y costo", () => {
    const paquete = new Paquete(2.5, 1000, 30, 400);

    expect(paquete.gb).toBe(2.5);
    expect(paquete.minutos).toBe(1000);
    expect(paquete.duracionDias).toBe(30);
    expect(paquete.costo).toBe(400);
    expect(paquete.fechaCompra).toBeDefined();
  });
  test("debería crear un paquete agotado correctamente", () => {
    const paquete = new Paquete(0, 0, 30, 400);
    expect(paquete.estaAgotado()).toBe(true);
  });

  test("debería crear un paquete no agotado correctamente", () => {
    const paquete = new Paquete(2.5, 1000, 30, 400);
    expect(paquete.estaAgotado()).toBe(false);
  });

  test("debería detectar si un paquete está vencido", () => {
    const paquete = new Paquete(2.5, 1000, 1, 400);
    const fechaFutura = new Date();
    fechaFutura.setDate(fechaFutura.getDate() + 2);
    expect(paquete.estaVencido(fechaFutura)).toBe(true);
  });

  test("debería detectar si un paquete no está vencido", () => {
    const paquete = new Paquete(2.5, 1000, 30, 400);
    expect(paquete.estaVencido()).toBe(false);
  });
  test("debería descontar correctamente consumo de internet", () => {
    const paquete = new Paquete(5, 100, 30, 400);
    const resultado = paquete.descontarConsumo("internet", 2);
    expect(resultado).toBe(true);
    expect(paquete.gb).toBe(3);
  });

  test("debería descontar correctamente consumo de minutos", () => {
    const paquete = new Paquete(5, 100, 30, 400);
    const resultado = paquete.descontarConsumo("llamadas", 50);
    expect(resultado).toBe(true);
    expect(paquete.minutos).toBe(50);
  });

  test("no debería permitir consumir más datos que los disponibles", () => {
    const paquete = new Paquete(3, 100, 30, 400);
    const resultado = paquete.descontarConsumo("internet", 10);
    expect(resultado).toBe(false);
    expect(paquete.gb).toBe(3);
  });

  test("no debería permitir consumir más minutos que los disponibles", () => {
    const paquete = new Paquete(5, 50, 30, 400);
    const resultado = paquete.descontarConsumo("llamadas", 100);
    expect(resultado).toBe(false);
    expect(paquete.minutos).toBe(50);
  });

  test("no debería permitir consumir cantidad negativa", () => {
    const paquete = new Paquete(5, 100, 30, 400);
    const resultadoInternet = paquete.descontarConsumo("internet", -5);
    const resultadoLlamadas = paquete.descontarConsumo("llamadas", -5);
    expect(resultadoInternet).toBe(false);
    expect(resultadoLlamadas).toBe(false);
    expect(paquete.gb).toBe(5);
    expect(paquete.minutos).toBe(100);
  });

  test("no debería permitir tipo de consumo desconocido", () => {
    const paquete = new Paquete(5, 100, 30, 400);
    const resultado = paquete.descontarConsumo("sms", 10);
    expect(resultado).toBe(false);
    expect(paquete.gb).toBe(5);
    expect(paquete.minutos).toBe(100);
  });
});
