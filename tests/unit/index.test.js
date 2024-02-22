import { describe, expect, it, vi } from "vitest";
import { shortAddr } from '/src/shared/lib/utils';
import { isAuthenticated } from "$shared/lib/auth"; 
import { get } from "svelte/store";


// Unit-tests for “wallet” variable (?)and for "isAuthenticated" function: 
// export function isAuthenticated() {
// 	return !isEmpty(get(wallet));
//   }
describe("isAuthenticated", () => {
	it("must return 'false' for an empty wallet", () => {
		vi.mocked(get).mockReturnValueOnce({}); // TypeError: vi.mocked(...).mockReturnValueOnce is not a function
		expect(isAuthenticated()).toBe(false);
		// vi.mock(get, {}).mock(); // Error: Expression expected
		// expect(() => isAuthenticated()).toBe(false);
	});
	it("must return 'true' for a non-empty wallet", () => {
		vi.mocked(get).mockReturnValueOnce({address:"0x192837465"});  // TypeError: vi.mocked(...).mockReturnValueOnce is not a function 
		expect(isAuthenticated()).toBe(true);
		// vi.mock(get, {address:"0x192837465"}).mock(); // Error: Expression expected
		// expect(() => isAuthenticated()).toBe(true);
	});
});


// Unit-tests to verify "shortAddr(addr)" function accepts only a string as "addr" argument
describe("shortAddr", () => {
	it("Positive test cases - if 'addr' argument is a string", () => {
		expect(() => shortAddr("string")).not.toThrow();
		expect(() => shortAddr("234")).not.toThrow();
		expect(() => shortAddr("")).not.toThrow();
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
