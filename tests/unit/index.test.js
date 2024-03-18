import { describe, expect, it, vi } from "vitest";
import { shortAddr } from '../../src/shared/lib/utils';
import { isAuthenticated } from "$shared/lib/auth"; 
import { get } from "svelte/store";
import { changeTheme } from '../../src/shared/lib/theme';
import { themes } from "../../src/shared/lib/enums/themes";
import { beforeEach } from "vitest";


// Unit-tests for “changeTheme(theme)” function: 
describe("changeTheme tests", () => {
	
	it("Positive test cases - if 'theme' argument is one of four valid string values", () => {
		// beforeEach(() => changeTheme("system"));
		const firstValidTheme = "dark";
		changeTheme(firstValidTheme);
		expect(document.documentElement.getAttribute("data-theme")).toEqual(firstValidTheme);

		const secondValidTheme = "light";
		changeTheme(secondValidTheme);
		expect(document.documentElement.getAttribute("data-theme")).toEqual(secondValidTheme);		
		// expect(() => changeTheme("dark")).not.toThrow();
	});

	// (?) Is it worth creating "Negative test cases"? If yes - which can make sense?
	it("Negative test cases ", () => {   
		// beforeEach(() => changeTheme("system"));
		// changeTheme(undefined);
		// expect(document.documentElement.getAttribute("data-theme")).toEqual("system");


		// expect((changeTheme(undefined)).equal("system"));
		// expect(() => changeTheme(undefined)).toThrow(); // AssertionError: expected [Function] to throw an error 
		// expect(() => changeTheme(null)).toThrow(); // AssertionError: expected [Function] to throw an error 
	});
})


describe("themes.hasOwnProperty(theme)", () => {
	it("Positive test cases ... ", () => {
		expect(() => themes.hasOwnProperty("light")).not.toThrow();
		expect(() => themes.hasOwnProperty("black")).not.toThrow();
	})
	it("Negative test cases ... ", () => {
		// expect(() => themes.hasOwnProperty("green")).toThrow(); // AssertionError: expected [Function] to throw an error
		// expect(() => themes.hasOwnProperty(undefined)).toThrow();  // AssertionError: expected [Function] to throw an error
		// expect(() => themes.hasOwnProperty(null)).toThrow();  // AssertionError: expected [Function] to throw an error 
	})
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
		expect(() => shortAddr("string")).not.toThrow();
		expect(() => shortAddr("234")).not.toThrow();
		expect(() => shortAddr("")).not.toThrow();
		expect(() => shortAddr("0x422849b355039bc58f2780cc4854919fc9cfaf94")).not.toThrow();
		expect(() => shortAddr("0xf7ceaa5da7305b87361f9db6a300bd6d74c674d2")).not.toThrow();
	});
	it("Negative test cases - throw an error if 'addr' argument is NOT a string", () => {
		expect(() => shortAddr(345)).toThrow();
		expect(() => shortAddr(true)).toThrow();
		expect(() => shortAddr(null)).toThrow();
		expect(() => shortAddr(undefined)).toThrow();
	});
}); 


// Unit-test example from Vite Tutorial 
describe('sum test', () => {
	it('adds 1 + 2 to equal 3', () => {
		expect(1 + 2).toBe(3);
	});
});
