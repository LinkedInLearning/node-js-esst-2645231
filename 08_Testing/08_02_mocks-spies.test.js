import test from "node:test";
import assert from "node:assert";

// -------------------

test("random generator works correctly", () => {
  const RandomHelper = {
    random: function () {
      return Math.random();
    },

    randomPercentage: function () {
      return this.random() * 100;
    },
  };

  assert.notEqual(RandomHelper.random(), RandomHelper.random());
  const mockRandom = test.mock.method(RandomHelper, "random", () => {
    return 3;
  });
  assert.strictEqual(RandomHelper.randomPercentage(), 300);
  assert.strictEqual(mockRandom.mock.calls.length, 1);
});
