import { assert } from "chai"; // Using Assert style
import { expect } from "chai";
import { Tareas } from "../utils/tareas.js";

describe("Grupo de tests de tareas", () => {
  it("deberia crear el contenedor de tareas vacio", () => {
    const tareas = new Tareas();

    const listadoTareas = tareas.list();

    expect(listadoTareas).to.have.lengthOf(0);

    assert.strictEqual(listadoTareas.length, 0);
  });

  it("deberia agregar tareas correctamente", () => {
    const tareas = new Tareas();

    tareas.add("salir a caminar");

    const listaTareas = tareas.list();

    assert.strictEqual(listaTareas.length, 1);
    assert.deepStrictEqual(listaTareas, [
      { title: "salir a caminar", complete: false },
    ]);

    tareas.add("salir a correr");
    assert.strictEqual(listaTareas.length, 2);
  });

  it("deberia marcar una tarea como completa", () => {
    const tareas = new Tareas();

    tareas.add("salir a caminar");

    tareas.complete("salir a caminar");

    const listaTareas = tareas.list();

    assert.deepStrictEqual(listaTareas, [
      { title: "salir a caminar", complete: true },
    ]);
  });

  it("deberia dar error cuando no hay tareas en la lista", () => {
    const tareas = new Tareas();

    const funcionDisparadora = () => {
      tareas.complete("tarea1");
    };

    expect(funcionDisparadora).to.throw(Error, "No hay tareas");
    assert.throws(funcionDisparadora, Error, "No hay tareas");
  });
});
