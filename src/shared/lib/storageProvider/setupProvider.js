import axios from "axios";
import lhp from "@lighthouse-web3/sdk";
import { ethers } from "ethers";

import { storageProviders } from "$lib/lib/enums/storageProviders"
import { storageProvider } from "$lib/lib/stores";


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
  const getApiKey = async(pubKey, privKey) => {
    const verificationMessage = (
      await axios.get(
        provider.verifyUrl + pubKey
      )
    ).data;

    const signedMessage = await signAuthMessage(privKey, verificationMessage);
    const response = await lhp.getApiKey(pubKey, signedMessage);

    return response.data.apiKey;
  }

  provider.apiKey = await getApiKey(publicKey, privateKey);

  if (store) storageProvider.set(provider);
}