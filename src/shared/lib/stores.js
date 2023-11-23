import { persisted } from "svelte-persisted-store";

export const wallet = persisted("wallet", {});

export const files = persisted("files", {});
