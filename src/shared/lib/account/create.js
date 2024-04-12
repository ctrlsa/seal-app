import { isEmpty } from "moderndash";

import { analytics } from "$lib/lib/analytics/analytics";
import { state } from "$lib/lib/stores/state";
import { createNewWallet } from "$lib/lib/wallet";
import { setupStorageProvider } from "$lib/lib/storageProvider/setup.js";



/**
 * Create new user account
 **/
export async function createNewAccount(accountType = "filecoin") {
  if (isEmpty(state.wallet)) {
    await createNewWallet();

    try {
      await setupStorageProvider(state.wallet.publicKey, state.wallet.privateKey);

      analytics.identify(state.wallet.anonymizedID);
      analytics.capture("account_created", {
        storage_protocol: state.account.storage.provider.protocol,
        storage_provider: state.account.storage.provider.id
      });
    } catch (e) {
      return Promise.reject(e);
    }

    return 1;
  } else {
    return Promise.reject("Account already exists");
  }
}