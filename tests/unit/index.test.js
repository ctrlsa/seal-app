import { describe, expect, it, test } from "vitest";
import { shortAddr } from '/src/shared/lib/utils';  // Error from Vitest: ReferenceError: window is not defined


// Unit-tests to verify "shortAddr(addr)" function accepts only a string as "addr" argument
describe("shortAddr", () => {
	it("Positive test cases - if 'addr' argument is a string", () => {
		expect(shortAddr("string")).not.toThrow();
		expect(shortAddr("234")).not.toThrow();
		expect(shortAddr("")).not.toThrow();
	});
	it("Negative test cases - throw an error if 'addr' argument is NOT a string", () => {
		expect(() => shortAddr(345)).toThrow();
		expect(() => shortAddr(true)).toThrow();
		expect(() => shortAddr(null)).toThrow();
		expect(() => shortAddr(undefined)).toThrow();
		expect(() => shortAddr([])).toThrow();
		expect(() => shortAddr({})).toThrow();
		expect(() => shortAddr(() => {})).toThrow();
	});
}); 


// Unit-test example from Vite Tutorial 
describe('sum test', () => {
	it('adds 1 + 2 to equal 3', () => {
		expect(1 + 2).toBe(3);
	});
});
