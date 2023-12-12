import { wallet } from "$lib/lib/stores.js";

export async function deleteWallet() {
  await wallet.set({});
}