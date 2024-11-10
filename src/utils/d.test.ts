import { describe, expect, test } from "vitest";
import { d } from "./d.js";

describe("Basic Dice Range Tests", function () {
  for (let i = 1; i <= 100; i++) {
    const roll = d(i);
    test(`d${i} - Result should be between 1 and ${i}`, function () {
      expect(roll).to.be.gte(1).and.lte(i);
    });
  }
});
