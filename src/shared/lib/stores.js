import { persisted } from "svelte-persisted-store";

/** App preferences */
export const preferences = persisted("preferences", {});

/** Encrypted wallet storage */
export const wallet = persisted("wallet", {});

/** Storage provider API key and other related data */
export const storageProvider = persisted("storageProvider", {});
