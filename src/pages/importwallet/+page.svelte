<script>
  import toast from "svelte-french-toast";
  import { goto } from "$app/navigation";

  import { importWallet } from "$lib/lib/wallet/import";
  import { isEmpty } from "moderndash";
  import { get } from "svelte/store";
  import { wallet } from "$lib/lib/stores/stores";
  import { setupStorageProvider } from "$lib/lib/storageProvider/setupProvider";


  let importType = "mnemonic";
  let keyInput;

  async function restoreAccount() {
    // Importing wallet
    await toast.promise(importWallet(keyInput, importType), {
      loading: "Restoring account",
      success: "Account restored",
      error: "Failed to restore account"
    });

    // Setup storage provider for a new wallet (request API key)
    if (!isEmpty(get(wallet))) {
      await toast.promise(setupStorageProvider($wallet.publicKey, $wallet.privateKey), {
        loading: "Setting up storage provider",
        success: "Storage provider setup complete",
        error: "Failed to setup storage provider"
      });
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