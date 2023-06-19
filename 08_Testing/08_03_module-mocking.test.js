import test from "node:test";
import assert from "node:assert";
import esmock from "esmock";
import { getPizzas } from "./getPizzas.js";
// -------------------

test("PizzaModule", async () => {
  const getPizzaMock = test.mock.fn(getPizzas);
  // Pizza "Achterbahn" gibt es nicht, daher throws
  const PizzaModule = await esmock("./PizzaModule.js", {
    "./getPizzas.js": {
      getPizzas: getPizzaMock,
    },
  });
  assert.throws(() => {
    PizzaModule.getPrice("Achterbahn");
  });

  // testen ob beim Aufruf von getPrice
  // auch getPizzas aufgerufen wird
  PizzaModule.getPrice("Funghi");
  assert.strictEqual(getPizzaMock.mock.calls.length, 2);
});
