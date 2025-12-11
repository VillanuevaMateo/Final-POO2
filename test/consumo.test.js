const Consumo = require("../src/consumo");
const Paquete = require("../src/paquete");
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

  test("debería almacenar correctamente la fecha de inicio y fin", () => {
    const inicio = new Date("2025-12-03T10:00:00");
    const fin = new Date("2025-12-03T10:30:00");

    const consumo = new Consumo("internet", 10, inicio, fin);

    expect(consumo.getFechaInicio()).toBe(inicio);
    expect(consumo.getFechaFin()).toBe(fin);
  });
});

describe("Paquete con app ilimitada", () => {

  test("debería crear un paquete con app ilimitada correctamente", () => {
    const paquete = new Paquete(5, 100, 30, 400, "WhatsApp");
    expect(paquete.gb()).toBe(5);
    expect(paquete.minutos()).toBe(100);
    expect(paquete.appIlimitada()).toBe("WhatsApp");
  });

  test("debería consumir internet sin descontar GB si es la app ilimitada", () => {
    const paquete = new Paquete(5, 100, 30, 400, "WhatsApp");
    const resultado = paquete.descontarConsumo("internet", 3, "WhatsApp");
    expect(resultado).toBe(true);
    expect(paquete.gb()).toBe(5); // No se descuentan GB
  });

  test("debería consumir internet normalmente si no es la app ilimitada", () => {
    const paquete = new Paquete(5, 100, 30, 400, "WhatsApp");
    const resultado = paquete.descontarConsumo("internet", 3, "Instagram");
    expect(resultado).toBe(true);
    expect(paquete.gb()).toBe(2); // GB se descuentan
  });

  test("debería consumir llamadas normalmente sin afectar la app", () => {
    const paquete = new Paquete(5, 100, 30, 400, "WhatsApp");
    const resultado = paquete.descontarConsumo("llamadas", 50);
    expect(resultado).toBe(true);
    expect(paquete.minutos()).toBe(50);
  });

  test("no debería permitir consumir más GB que los disponibles para apps no ilimitadas", () => {
    const paquete = new Paquete(3, 100, 30, 400, "WhatsApp");
    expect(() => paquete.descontarConsumo("internet", 10, "Instagram")).toThrow(
      "No hay suficientes GB disponibles"
    );
  });

  test("no debería afectar GB si se consume la app ilimitada aunque la cantidad sea mayor que los GB disponibles", () => {
    const paquete = new Paquete(3, 100, 30, 400, "WhatsApp");
    const resultado = paquete.descontarConsumo("internet", 10, "WhatsApp");
    expect(resultado).toBe(true);
    expect(paquete.gb()).toBe(3); // GB no se descuentan
  });

  test("debería lanzar error al consumir tipo desconocido incluso con app", () => {
    const paquete = new Paquete(5, 100, 30, 400, "WhatsApp");
    expect(() => paquete.descontarConsumo("sms", 5, "WhatsApp")).toThrow(
      "Tipo de consumo desconocido"
    );
  });

  test("debería lanzar error al consumir cantidad negativa incluso con app", () => {
    const paquete = new Paquete(5, 100, 30, 400, "WhatsApp");
    expect(() => paquete.descontarConsumo("internet", -3, "WhatsApp")).toThrow(
      "La cantidad a consumir debe ser positiva"
    );
  });

});

