import { analytics } from "$lib/lib/analytics/analytics";
import { db } from "$lib/lib/db";
import { deleteWallet } from "$lib/lib/wallet";
import { state } from "$lib/lib/stores/state";
import { removeStorageProvider } from "$lib/lib/storageProvider/remove";



/**
 * Delete user account from device
 **/
export async function deleteAccount(id = "") {
  await deleteWallet();

  analytics.capture("account_deleted", {
    storage_protocol: state.account.storage.provider.protocol,
    storage_provider: state.account.storage.provider.id
  });
  analytics.reset();

  await removeStorageProvider();
  await db.files.clear();

  return 1;
}