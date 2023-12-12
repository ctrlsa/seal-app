import { storageProvider } from "$lib/lib/stores";

export async function removeStorageProvider() {
  await storageProvider.set({});
}