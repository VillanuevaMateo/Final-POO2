const Prestamo = require("../src/prestamo");
const Cliente = require("../src/Cliente");

describe("Prestamo", () => {

  test("debería crearse con tipo, cantidad, fechas y referencias a donante y receptor", () => {
    const donante = new Cliente("Ana Pérez", "0987654321", 200);
    const receptor = new Cliente("Juan Valdez", "0987654321", 200);
    const inicio = new Date(2024, 0, 1);
    const venc = new Date(2024, 0, 10);

    const p = new Prestamo("datos", 300, inicio, venc, donante, receptor);

    expect(p.tipoPrestamo()).toBe("datos");
    expect(p.cantidadPrestada()).toBe(300);
    expect(p.fechaDeInicio()).toBe(inicio);
    expect(p.fechaDeVencimiento()).toBe(venc);
    expect(p.getDonante()).toBe(donante);
    expect(p.getReceptor()).toBe(receptor);
  });

  test("debería indicar que está vencido si la fecha consultada es posterior al vencimiento", () => {
    const p = new Prestamo(
      "minutos",
      20,
      new Date(2024, 0, 1),
      new Date(2024, 0, 5),
      {},
      {}
    );

    expect( p.estaVencidoEn(new Date(2024, 0, 6)) ).toBe(true);
  });

  test("debería indicar que no está vencido si la fecha consultada es anterior al vencimiento", () => {
    const p = new Prestamo(
      "minutos",
      20,
      new Date(2024, 0, 1),
      new Date(2024, 0, 5),
      {},
      {}
    );

    expect( p.estaVencidoEn(new Date(2024, 0, 4)) ).toBe(false);
  });

  test("debería indicar vencido si la fecha consultada es igual a la de vencimiento", () => {
    const p = new Prestamo(
      "minutos",
      20,
      new Date(2024, 0, 1),
      new Date(2024, 0, 5),
      {},
      {}
    );

    expect( p.estaVencidoEn(new Date(2024, 0, 5)) ).toBe(true);
  });

});
