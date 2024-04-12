import { ethers } from "ethers";
import { newDelegatedEthAddress } from "@glif/filecoin-address";

import { state } from "$lib/lib/stores/state.js";
import { generateUniqueUserID } from "$lib/lib/account/id.js";



/** Generate and store a new Filecoin f410 wallet */
export async function createNewWallet() {
  // Generate an Ethereum key pair
  const ethWallet = ethers.Wallet.createRandom();

  // Convert to Filecoin f410 address
  const filAddress = newDelegatedEthAddress(ethWallet.address).toString();

  /**
   * @TODO store wallet in IndexedDB
   */
  state.wallet = {
    anonymizedID: "",
    address: filAddress,
    publicKey: ethWallet.address,
    privateKey: ethWallet.privateKey,
    mnemonicPhrase: ethWallet.mnemonic.phrase
  };

  /**
   * Generate new anonymized user ID from ETH wallet address
   */
  generateUniqueUserID(ethWallet.address).then((id) => {
    state.wallet.anonymizedID = id;
  });

  return 1;
}

export async function importWallet(key, type = "mnemonic") {
  let ethWallet;
  let mnemonic = "";

  // Generate an Ethereum key pair
  if (type === "mnemonic") {
    ethWallet = ethers.Wallet.fromPhrase(key.toString().trim());
  } else {
    ethWallet = new ethers.Wallet(key.toString().trim());
  }

  // Convert to Filecoin f410 address
  const filAddress = newDelegatedEthAddress(ethWallet.address).toString();

  if (type === "mnemonic") {
    mnemonic = ethWallet.mnemonic.phrase;
  }

  /**
   * @TODO store wallet in IndexedDB
   */
  state.wallet = {
    anonymizedID: "",
    address: filAddress,
    publicKey: ethWallet.address,
    privateKey: ethWallet.privateKey,
    mnemonicPhrase: mnemonic
  };

  /**
   * Generate new anonymized user ID from ETH wallet address
   */
  generateUniqueUserID(ethWallet.address).then((id) => {
    state.wallet.anonymizedID = id;
  });

  return 1;
}

export async function deleteWallet() {
  state.wallet = {};
}
