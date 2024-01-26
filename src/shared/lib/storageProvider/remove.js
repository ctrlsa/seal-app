import { storageProvider } from "$lib/lib/stores/stores";

export async function removeStorageProvider() {
  await storageProvider.set({});
}