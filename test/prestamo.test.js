const Prestamo = require("../src/prestamo");
const Cliente = require("../src/Cliente");

describe("Prestamo", () => {
  test("debería crearse con tipo, cantidad, fechas y referencias a donante y receptor", () => {
    const donante = new Cliente("Ana Pérez", "0987654321", 200);
    const receptor = new Cliente("Juan Valdez", "0987654321", 200);
    const inicio = new Date(2024, 0, 1);
    const venc = new Date(2024, 0, 10);

    const p = new Prestamo("internet", 300, inicio, venc, donante, receptor);

    expect(p.tipoPrestamo()).toBe("internet");
    expect(p.cantidadPrestada()).toBe(300);
    expect(p.fechaDeInicio()).toBe(inicio);
    expect(p.fechaDeVencimiento()).toBe(venc);
    expect(p.getDonante()).toBe(donante);
    expect(p.getReceptor()).toBe(receptor);
  });

  test("debería indicar que está vencido si la fecha consultada es posterior al vencimiento", () => {
    const p = new Prestamo(
      "llamadas",
      20,
      new Date(2024, 0, 1),
      new Date(2024, 0, 5),
      {},
      {}
    );

    expect(p.estaVencidoEn(new Date(2024, 0, 6))).toBe(true);
  });

  test("debería indicar que no está vencido si la fecha consultada es anterior al vencimiento", () => {
    const p = new Prestamo(
      "llamadas",
      20,
      new Date(2024, 0, 1),
      new Date(2024, 0, 5),
      {},
      {}
    );

    expect(p.estaVencidoEn(new Date(2024, 0, 4))).toBe(false);
  });

  test("debería indicar vencido si la fecha consultada es igual a la de vencimiento", () => {
    const p = new Prestamo(
      "llamadas",
      20,
      new Date(2024, 0, 1),
      new Date(2024, 0, 5),
      {},
      {}
    );

    expect(p.estaVencidoEn(new Date(2024, 0, 5))).toBe(true);
  });
});

describe("Historial de préstamos en Cliente", () => {
  test("debería iniciar sin préstamos otorgados ni recibidos", () => {
    const cliente = new Cliente("Juan", "111", 100);

    expect(cliente._getPrestamosOtorgados()).toEqual([]);
    expect(cliente._getPrestamosRecibidos()).toEqual([]);
  });

  test("debería registrar un préstamo otorgado correctamente", () => {
    const donante = new Cliente("Donante", "111", 100);
    const receptor = new Cliente("Receptor", "222", 100);

    const prestamo = new Prestamo(
      "internet",
      2,
      new Date(),
      new Date(Date.now() + 86400000),
      donante,
      receptor
    );

    donante._registrarPrestamoOtorgado(prestamo);

    const otorgados = donante._getPrestamosOtorgados();

    expect(otorgados.length).toBe(1);
    expect(otorgados[0]).toBe(prestamo);
    expect(otorgados[0].getReceptor()).toBe(receptor);
  });

  test("debería registrar un préstamo recibido correctamente", () => {
    const donante = new Cliente("Donante", "111", 100);
    const receptor = new Cliente("Receptor", "222", 100);

    const prestamo = new Prestamo(
      "llamadas",
      10,
      new Date(),
      new Date(Date.now() + 86400000),
      donante,
      receptor
    );

    receptor._registrarPrestamoRecibido(prestamo);

    const recibidos = receptor._getPrestamosRecibidos();

    expect(recibidos.length).toBe(1);
    expect(recibidos[0]).toBe(prestamo);
    expect(recibidos[0].getDonante()).toBe(donante);
  });

  test("el cliente puede registrar múltiples préstamos otorgados y recibidos", () => {
    const a = new Cliente("A", "111", 100);
    const b = new Cliente("B", "222", 100);

    const p1 = new Prestamo(
      "internet",
      1,
      new Date(),
      new Date(Date.now() + 86400000),
      a,
      b
    );

    const p2 = new Prestamo(
      "llamadas",
      5,
      new Date(),
      new Date(Date.now() + 172800000),
      a,
      b
    );

    a._registrarPrestamoOtorgado(p1);
    a._registrarPrestamoOtorgado(p2);

    b._registrarPrestamoRecibido(p1);
    b._registrarPrestamoRecibido(p2);

    expect(a._getPrestamosOtorgados().length).toBe(2);
    expect(b._getPrestamosRecibidos().length).toBe(2);

    expect(a._getPrestamosOtorgados()).toContain(p1);
    expect(a._getPrestamosOtorgados()).toContain(p2);

    expect(b._getPrestamosRecibidos()).toContain(p1);
    expect(b._getPrestamosRecibidos()).toContain(p2);
  });
});
