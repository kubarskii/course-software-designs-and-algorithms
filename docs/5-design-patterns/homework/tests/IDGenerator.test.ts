import { describe, expect, it } from "@jest/globals";
import { IDGenerator } from "../src/IDGenerator";

describe("IDGenerator tests", () => {
  it("should generate unique id", () => {
    const id1 = IDGenerator.getId();
    const id2 = IDGenerator.getId();

    expect(id1).not.toBe(id2);
    expect(id2 - id1).toBe(1)
  });
});
