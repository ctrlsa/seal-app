import { isEmpty } from "moderndash";

import { analytics } from "$lib/lib/analytics/analytics";
import { importWallet } from "$lib/lib/wallet";
import { setupStorageProvider } from "$lib/lib/storageProvider/setup.js";
import { state } from "$lib/lib/stores/state";



/**
 * Restore user account
 **/
export async function restoreAccount(keyInput, importType, accountType = "filecoin") {
  if (isEmpty(state.wallet)) {
    try {
      await importWallet(keyInput, importType);

      try {
        await setupStorageProvider(state.wallet.publicKey, state.wallet.privateKey);

        analytics.identify(state.wallet.anonymizedID);
        analytics.capture("account_imported", {
          imported_via: importType,
          storage_protocol: state.account.storage.provider.protocol,
          storage_provider: state.account.storage.provider.id
        });
      } catch (e) {
        return Promise.reject(e);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  return 1;
}
