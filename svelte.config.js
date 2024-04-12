import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import * as child_process from "node:child_process";

import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const path = fileURLToPath(new URL('package.json', import.meta.url));
const pkg = JSON.parse(readFileSync(path, 'utf8'));


/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: "build",
			assets: "build",
			fallback: "index.html",
			precompress: false,
			strict: true
		}),
		files: {
			lib: "src/shared",
			routes: "src/pages"
		},
		alias: {
			$pages: "src/pages",
			$widgets: "src/widgets",
			$shared: "src/shared"
		},
		version: {
			name: pkg.version,

		}
	},
	preprocess: vitePreprocess()
};

export default config;
