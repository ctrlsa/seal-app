import { persisted } from "svelte-persisted-store";
import { writable } from "svelte/store";

/** App preferences */
export const preferences = persisted("preferences", {});

/** Encrypted wallet storage */
export const wallet = persisted("wallet", {});

/** Information about available storage from a provider */
export const storageInfo = persisted("storageInfo", { used: 0, limit: 0 });

/** Storage provider API key and other related data */
export const storageProvider = persisted("storageProvider", {});

/** Parsed information about browser */
export const browser = writable("storageProvider");
