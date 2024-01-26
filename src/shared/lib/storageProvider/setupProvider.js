import axios from "axios";
import { getApiKey } from "@lighthouse-web3/sdk";
import { ethers } from "ethers";

import { TIMEOUT } from "$lib/lib/constants";
import { storageProviders } from "$lib/lib/enums/storageProviders"
import { storageProvider } from "$lib/lib/stores/stores";


/** Setup a storage provider for a wallet/user */
export async function setupStorageProvider(publicKey, privateKey, store = true) {
  let provider = storageProviders.lighthouse;

  /** Sign auth message to get the API key from Lighthouse provider */
  const signAuthMessage = async(privateKey, messageRequested) => {
    const userWallet = new ethers.Wallet(privateKey);
    const signedMessage = await userWallet.signMessage(messageRequested);

    return signedMessage;
  }

  /** Get the API key from Lighthouse provider */
  const getApi = async(pubKey, privKey) => {
    const res = (
      await axios.get(
        provider.verifyUrl + pubKey, { timeout: TIMEOUT }
      )
    );

    if (res.status === 200) {
      const verificationMessage = res.data;

      const signedMessage = await signAuthMessage(privKey, verificationMessage);
      const response = await getApiKey(pubKey, signedMessage);

      return response.data.apiKey;
    } else {
      console.log(res);
      return false;
    }
  }

  try {
    provider.apiKey = await getApi(publicKey, privateKey);
  } catch (e) {
    throw new Error("Could not get a API key");
  }

  if (store) storageProvider.set(provider);
}