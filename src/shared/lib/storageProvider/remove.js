import { state } from "$lib/lib/stores/state";



export async function removeStorageProvider() {
  state.account.storage.info = { used: 0, limit: 0 };
  state.account.storage.provider = {};
}
