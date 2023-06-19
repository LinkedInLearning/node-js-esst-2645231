import { getPizzas } from "./getPizzas.js";

export function getPrice(pizzaName) {
  const pizzaObj = getPizzas().find((p) => {
    return p.name === pizzaName;
  });

  if (!pizzaObj) {
    throw new Error("Pizza nicht gefunden");
  } else {
    return pizzaObj.price;
  }
}
