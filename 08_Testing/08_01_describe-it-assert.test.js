import test from "node:test";
import assert from "node:assert";

function getLength(array) {
  return array.length;
}

test("should return 3", () => {
  assert.strictEqual(getLength([3, 4, 3]), 3);
});

test("should throw error when null", () => {
  assert.throws(() => {
    getLength(null);
  });
});

test("should be undefined for empty object", () => {
  assert.doesNotThrow(() => {
    getLength({});
  });

  assert.strictEqual(getLength({}), undefined);
});
