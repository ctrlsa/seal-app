import { ethers } from "ethers";
import { newDelegatedEthAddress } from "@glif/filecoin-address";

import { wallet } from "$lib/lib/stores.js";


/** Generate and store a new Filecoin f410 wallet */
export async function createNewWallet() {
  // Generate an Ethereum key pair
  const ethWallet = ethers.Wallet.createRandom();

  // Convert to Filecoin f410 address
  const filAddress = newDelegatedEthAddress(ethWallet.address).toString();

  // Creating a new wallet object
  const newWallet = {
    address: filAddress,
    publicKey: ethWallet.address,
    privateKey: ethWallet.privateKey,
    mnemonicPhrase: ethWallet.mnemonic.phrase
  }

  // Store new user wallet
  wallet.set(newWallet);
}