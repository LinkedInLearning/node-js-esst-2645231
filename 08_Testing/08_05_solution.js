import test from "node:test";
import assert from "node:assert";

test("My Group", async (t) => {
  let array;

  t.beforeEach(() => {
    array = ["foo"];
  });

  await t.test("test array length", () => {
    array.push("bar");
    assert.strictEqual(array.length, 2);
  });

  await t.test("test array length again", () => {
    array.push("bar");
    assert.strictEqual(array.length, 2);
  });

  await t.test("test array length AND AGAIN", () => {
    array.push("bar");
    assert.strictEqual(array.length, 2);
  });
});
