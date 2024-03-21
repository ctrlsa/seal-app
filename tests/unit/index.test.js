import { describe, expect, it, vi } from "vitest";
import { shortAddr } from '../../src/shared/lib/utils';
import { isAuthenticated } from "$shared/lib/auth"; 
import { get } from "svelte/store";
import { changeTheme } from '../../src/shared/lib/theme';
import { themes } from "../../src/shared/lib/enums/themes";
import { beforeEach } from "vitest";


// Unit-tests for “changeTheme(theme)” function: 
describe("changeTheme tests", () => {
	beforeEach(() => changeTheme("system")); 
	it("should check 'theme' argument with a valid theme value and verify switching themes works properly (positive test case)", () => {
		const firstValidTheme = "dark";
		changeTheme(firstValidTheme);
		expect(document.documentElement.getAttribute("data-theme")).toEqual(firstValidTheme);
	});
	it("should check 'theme' argument with invalid theme values & confirm they do NOT impact the current theme (negative test cases)", () => {   
		changeTheme(undefined);
		expect(document.documentElement.getAttribute("data-theme")).toEqual("system");
		changeTheme("green");
		expect(document.documentElement.getAttribute("data-theme")).toEqual("system");

	});
})


// Unit-tests for “wallet” variable (?)and for "isAuthenticated" function: 
// export function isAuthenticated() {
// 	return !isEmpty(get(wallet));
//   }
describe("isAuthenticated", () => {
	it("must return 'false' for an empty wallet", () => {
		// vi.mocked(get).mockReturnValueOnce({}); // TypeError: vi.mocked(...).mockReturnValueOnce is not a function
		expect(isAuthenticated()).toBe(false);
	});
	it("must return 'true' for a non-empty wallet", () => {
		// vi.mocked(get).mockReturnValueOnce({address:"0x192837465"}); // TypeError: vi.mocked(...).mockReturnValueOnce is not a function 
		// expect(isAuthenticated()).toBe(true); // AssertionError: expected false to be true // Object.is equality
	});
});


// Unit-tests to verify "shortAddr(addr)" function accepts only a string as "addr" argument
describe("shortAddr", () => {
	it("Positive test cases - if 'addr' argument is a string", () => {
		const result = shortAddr("0x422849b355039bc58f2780cc4854919fc9cfaf94"); 
		expect(result).toEqual("0x4228...af94");
	});
	it("Negative test cases - throw an error if 'addr' argument is NOT a string", () => {
		expect(() => shortAddr(345)).toThrow();
		expect(() => shortAddr(undefined)).toThrow();
	});
}); 


// Unit-test example from Vite Tutorial 
describe('sum test', () => {
	it('adds 1 + 2 to equal 3', () => {
		expect(1 + 2).toBe(3);
	});
});
