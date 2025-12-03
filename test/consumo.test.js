const Consumo = require("../src/consumo");

describe("Consumo individual", () => {

  test("debería crearse un consumo de internet correctamente", () => {
    const inicio = new Date();
    const fin = new Date(inicio.getTime() + 60000);

    const consumo = new Consumo("internet", 5, inicio, fin);

    expect(consumo.getTipo()).toBe("internet");
    expect(consumo.getCantidad()).toBe(5);
    expect(consumo.getFechaInicio()).toBe(inicio);
    expect(consumo.getFechaFin()).toBe(fin);
  });

  test("debería crearse un consumo de llamadas correctamente", () => {
    const inicio = new Date();
    const fin = new Date(inicio.getTime() + 120000);

    const consumo = new Consumo("llamadas", 10, inicio, fin);

    expect(consumo.getTipo()).toBe("llamadas");
    expect(consumo.getCantidad()).toBe(10);
    expect(consumo.getFechaInicio()).toBe(inicio);
    expect(consumo.getFechaFin()).toBe(fin);
  });

  test("no debería permitir cantidad negativa", () => {
    const inicio = new Date();
    const fin = new Date(inicio.getTime() + 60000);

    expect(() => new Consumo("internet", -5, inicio, fin)).toThrow(
      "La cantidad a consumir debe ser positiva"
    );
  });

  test("no debería permitir tipo de consumo desconocido", () => {
    const inicio = new Date();
    const fin = new Date(inicio.getTime() + 60000);

    expect(() => new Consumo("sms", 5, inicio, fin)).toThrow(
      "Tipo de consumo desconocido"
    );
  });

  test("debería almacenar correctamente la fecha de inicio y fin", () => {
    const inicio = new Date("2025-12-03T10:00:00");
    const fin = new Date("2025-12-03T10:30:00");

    const consumo = new Consumo("internet", 10, inicio, fin);

    expect(consumo.getFechaInicio()).toBe(inicio);
    expect(consumo.getFechaFin()).toBe(fin);
  });

});