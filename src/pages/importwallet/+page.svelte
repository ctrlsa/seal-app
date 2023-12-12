<script>
  import toast from "svelte-french-toast";
  import { goto } from "$app/navigation";

  import { importWallet } from "$lib/lib/wallet/import.js";
  import { isEmpty } from "moderndash";
  import { get } from "svelte/store";
  import { wallet } from "$lib/lib/stores.js";
  import { setupStorageProvider } from "$lib/lib/storageProvider/setupProvider.js";


  let importType = "mnemonic";
  let keyInput;

  async function restoreAccount() {
    await importWallet(keyInput, importType);

    // Setup storage provider for a new wallet (request API key)
    if (!isEmpty(get(wallet))) {
      await setupStorageProvider($wallet.publicKey, $wallet.privateKey);
    }

    toast.success("Account restored");

    try {
      //await setupStorageProvider($wallet.publicKey, $wallet.privateKey);
    } catch (e) {

    }

    goto("/myfiles", { replaceState: true });
  }
</script>


<main class="grow px-2 mt-2">
  <div class="grid grid-flow-col auto-cols-max gap-x-3">
    <div class="">
      <label class="label cursor-pointer">
        <span class="label-text pr-2">Mnemonic</span>
        <input bind:group={importType} type="radio" name="radioIType" value="mnemonic" class="radio checked:bg-info" checked />
      </label>
    </div>
    <div class="">
      <label class="label cursor-pointer">
        <span class="label-text pr-2">Private key</span>
        <input bind:group={importType} type="radio" name="radioIType" value="privatekey" class="radio checked:bg-info" />
      </label>
    </div>
  </div>
  <div class="grid grid-cols-1 mt-3">
    <textarea bind:value={keyInput} class="textarea textarea-bordered textarea-md w-full h-28"></textarea>
  </div>
  <div class="grid grid-cols-1 mt-3">
    <button class="btn btn-primary" on:click={restoreAccount}>Import</button>
  </div>
</main>