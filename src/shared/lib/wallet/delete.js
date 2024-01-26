import { wallet } from "$lib/lib/stores/stores";

export async function deleteWallet() {
  await wallet.set({});
}