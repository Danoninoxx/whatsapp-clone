import { describe, it, expect } from "vitest";

describe("Algo verdadero o falso", () => {
    it("debe ser verdadero", () => {
        expect(true).toBe(true);
    });
    it("debe ser falso", () => {
        expect(false).toBe(false);
    });
})