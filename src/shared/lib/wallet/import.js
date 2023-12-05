import { newDelegatedEthAddress } from "@glif/filecoin-address";
import { ethers } from "ethers";

import { wallet } from "$lib/lib/stores.js";


export async function importWallet(key, type = "mnemonic") {
  let ethWallet;
  let mnemonic = "";

  // Generate an Ethereum key pair
  if (type === "mnemonic") {
    ethWallet = fromMnemonic(key);
  } else {
    ethWallet = fromPrivateKey(key);
  }

  // Convert to Filecoin f410 address
  const filAddress = newDelegatedEthAddress(ethWallet.address).toString();

  if (importType === "mnemonic") {
    mnemonic = ethWallet.mnemonic.phrase;
  }

  // Creating a new wallet object
  const newWallet = {
    address: filAddress,
    publicKey: ethWallet.address,
    privateKey: ethWallet.privateKey,
    mnemonicPhrase: mnemonic
  }

  // Store new user wallet
  wallet.set(newWallet);
  console.log(newWallet);
}

function fromMnemonic(mnemonicPhrase) {
  return ethers.Wallet.fromPhrase(mnemonicPhrase.toString().trim());
}

function fromPrivateKey(privateKey) {
  return new ethers.Wallet(privateKey.toString().trim());
}