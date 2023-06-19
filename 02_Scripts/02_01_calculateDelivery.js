const summe = process.argv[2];
const summeAsNumber = summe * 1;

if (summeAsNumber >= 35) {
  console.log("Keine Lieferkosten");
} else {
  const diffCosts = 35 - summeAsNumber;
  const deliveryCosts = 0.2 * diffCosts;

  console.log("Lieferkosten", deliveryCosts, "EUR");
}
