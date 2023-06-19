process.stdin.on("data", (data) => {
  const orderCosts = data.toString();
  const orderCostsNumber = orderCosts * 1;

  if (Number.isNaN(orderCostsNumber)) {
    console.log(orderCosts, "ist keine Zahl");
  } else {
    if (orderCostsNumber >= 35) {
      console.log("Keine Lieferkosten");
    } else {
      const diffCosts = 35 - orderCostsNumber;
      const deliveryCosts = 0.2 * diffCosts;

      console.log("Lieferkosten", deliveryCosts, "EUR");
    }
  }
});
