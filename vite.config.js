import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
	//ssr: { noExternal: true},
	plugins: [sveltekit()],
	resolve: {
		alias: {
			buffer: 'buffer/',
		},
	},
	test: {
		include: ['tests/unit/**/*.{test,spec}.{js,ts}']
	}
});
