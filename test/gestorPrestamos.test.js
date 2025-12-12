const Cliente = require("../src/Cliente");
const GestorPrestamos = require("../src/gestorPrestamos");
const Paquete = require("../src/paquete");
const Prestamo = require("../src/prestamo");

describe("Gestor de Préstamos", () => {
  let gestor;
  let donante;
  let receptor;

  beforeEach(() => {
    gestor = new GestorPrestamos();

    donante = new Cliente("Donante Test", "111111", 1000);
    receptor = new Cliente("Receptor Test", "222222", 1000);

    donante.comprarPaquete(10, 10, 5, 100);
    receptor.comprarPaquete(0, 0, 5, 100);
  });

  test("debería permitir otorgar un préstamo válido", () => {
    const prestamo = gestor.otorgarPrestamo(donante, receptor, "internet", 2);

    expect(prestamo).toBeInstanceOf(Prestamo);

    expect(donante._getPrestamosOtorgados().length).toBe(1);
    expect(donante._getPrestamosOtorgados()[0]).toBe(prestamo);

    expect(receptor._getPrestamosRecibidos().length).toBe(1);
    expect(receptor._getPrestamosRecibidos()[0]).toBe(prestamo);
  });

  test("no debería permitir prestar si el receptor ya tiene un préstamo vigente", () => {
    gestor.otorgarPrestamo(donante, receptor, "internet", 2);

    expect(() =>
      gestor.otorgarPrestamo(donante, receptor, "internet", 1)
    ).toThrow("El receptor ya tiene un préstamo vigente");
  });

  test("no debería permitir prestar si el donante no tiene suficientes GB", () => {
    expect(() =>
      gestor.otorgarPrestamo(donante, receptor, "internet", 999)
    ).toThrow("El donante no tiene suficientes GB para prestar");
  });

  test("no debería permitir prestar si el donante no tiene suficientes minutos", () => {
    expect(() =>
      gestor.otorgarPrestamo(donante, receptor, "llamadas", 999)
    ).toThrow("El donante no tiene suficientes minutos para prestar");
  });

  test("debería permitir nuevo préstamo si el previo ya venció", () => {
    const prestamo = gestor.otorgarPrestamo(donante, receptor, "internet", 2);

    prestamo._getVencimiento = () => new Date(2000, 0, 1);

    const nuevoPrestamo = gestor.otorgarPrestamo(
      donante,
      receptor,
      "internet",
      1
    );

    expect(nuevoPrestamo).toBeInstanceOf(Prestamo);
    expect(receptor._getPrestamosRecibidos().length).toBe(2);
  });

  test("no debería permitir prestar si el donante no tiene un paquete activo", () => {
    const gestor = new GestorPrestamos();

    const donante = new Cliente("Donante", "111");
    const receptor = new Cliente("Receptor", "222");

    expect(() =>
      gestor.otorgarPrestamo(donante, receptor, "internet", 1)
    ).toThrow("El donante no tiene un paquete activo");
  });
});
