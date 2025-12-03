const Paquete = require("../src/paquete");

describe("Paquete", () => {
  test("debería crearse con GB, minutos, duración y costo", () => {
    const paquete = new Paquete(2.5, 1000, 30, 400);

    expect(paquete.gb()).toBe(2.5);
    expect(paquete.minutos()).toBe(1000);
    expect(paquete.duracionDias()).toBe(30);
    expect(paquete.costo()).toBe(400);
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
    expect(paquete.gb()).toBe(3);
  });

  test("debería descontar correctamente consumo de minutos", () => {
    const paquete = new Paquete(5, 100, 30, 400);
    const resultado = paquete.descontarConsumo("llamadas", 50);
    expect(resultado).toBe(true);
    expect(paquete.minutos()).toBe(50);
  });
  test("no debería permitir consumir cantidad negativa de internet", () => {
    const paquete = new Paquete(5, 100, 30, 400);
    expect(() => paquete.descontarConsumo("internet", -5)).toThrow(
      "La cantidad a consumir debe ser positiva"
    );
  });

  test("no debería permitir consumir cantidad negativa de minutos", () => {
    const paquete = new Paquete(5, 100, 30, 400);
    expect(() => paquete.descontarConsumo("llamadas", -10)).toThrow(
      "La cantidad a consumir debe ser positiva"
    );
  });

  test("no debería permitir consumir más GB de los disponibles", () => {
    const paquete = new Paquete(3, 100, 30, 400);
    expect(() => paquete.descontarConsumo("internet", 10)).toThrow(
      "No hay suficientes GB disponibles"
    );
  });

  test("no debería permitir consumir más minutos de los disponibles", () => {
    const paquete = new Paquete(5, 50, 30, 400);
    expect(() => paquete.descontarConsumo("llamadas", 100)).toThrow(
      "No hay suficientes minutos disponibles"
    );
  });

  test("no debería permitir tipo de consumo desconocido", () => {
    const paquete = new Paquete(5, 100, 30, 400);
    expect(() => paquete.descontarConsumo("sms", 10)).toThrow(
      "Tipo de consumo desconocido"
    );
  });
});