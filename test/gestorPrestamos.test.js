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

describe("Gestor de Préstamos - Casos borde", () => {
  test("no debe permitir prestar si el receptor tiene un paquete activo", () => {
    const gestor = new GestorPrestamos();

    const donante = new Cliente("Donante", "111", 1000);
    const receptor = new Cliente("Receptor", "222", 1000);

    donante.comprarPaquete(5, 100, 30, 100);
    receptor.comprarPaquete(5, 100, 30, 100);

    expect(() =>
      gestor.otorgarPrestamo(donante, receptor, "internet", 1)
    ).toThrow("El receptor ya tiene un paquete activo");
  });

  test("no debe permitir prestar si el receptor tiene un préstamo vigente", () => {
    const gestor = new GestorPrestamos();

    const donante = new Cliente("Donante", "111", 1000);
    const receptor = new Cliente("Receptor", "222", 1000);

    donante.comprarPaquete(5, 100, 30, 100);

    const otroPrestamo = new Prestamo(
      "internet",
      2,
      new Date(),
      new Date(Date.now() + 100000),
      donante,
      receptor
    );
    receptor._registrarPrestamoRecibido(otroPrestamo);

    expect(() =>
      gestor.otorgarPrestamo(donante, receptor, "internet", 1)
    ).toThrow("El receptor ya tiene un préstamo vigente");
  });

  test("debe permitir prestar si el receptor tiene un paquete vencido", () => {
    const gestor = new GestorPrestamos();

    const donante = new Cliente("Donante", "111", 1000);
    const receptor = new Cliente("Receptor", "222", 1000);

    donante.comprarPaquete(5, 100, 30, 100);

    receptor.comprarPaquete(5, 100, -10, 100);

    expect(() =>
      gestor.otorgarPrestamo(donante, receptor, "internet", 1)
    ).not.toThrow();
  });

  test("debe permitir prestar si el receptor tiene un préstamo vencido", () => {
    const gestor = new GestorPrestamos();

    const donante = new Cliente("Donante", "111", 1000);
    const receptor = new Cliente("Receptor", "222", 1000);

    donante.comprarPaquete(5, 100, 30, 100);

    const prestamoVencido = new Prestamo(
      "internet",
      1,
      new Date(Date.now() - 200000),
      new Date(Date.now() - 100000),
      donante,
      receptor
    );
    receptor._registrarPrestamoRecibido(prestamoVencido);

    expect(() =>
      gestor.otorgarPrestamo(donante, receptor, "internet", 1)
    ).not.toThrow();
  });

  test("no debe permitir prestar tipos inválidos", () => {
    const gestor = new GestorPrestamos();

    const donante = new Cliente("Donante", "111", 1000);
    const receptor = new Cliente("Receptor", "222", 1000);

    donante.comprarPaquete(5, 100, 30, 100);

    expect(() => gestor.otorgarPrestamo(donante, receptor, "sms", 2)).toThrow(
      "Tipo de préstamo inválido"
    );
  });

  test("la fecha de vencimiento del préstamo debe coincidir con la del paquete del donante", () => {
    const gestor = new GestorPrestamos();

    const donante = new Cliente("Donante", "111", 1000);
    const receptor = new Cliente("Receptor", "222", 1000);

    donante.comprarPaquete(5, 100, 10, 100);

    const prestamo = gestor.otorgarPrestamo(donante, receptor, "internet", 1);

    const paqueteDonante = donante._getPaquete();

    const fechaEsperada = new Date(paqueteDonante.fechaDeVencimiento());

    expect(prestamo.fechaDeVencimiento().toDateString()).toBe(
      fechaEsperada.toDateString()
    );
  });
});
