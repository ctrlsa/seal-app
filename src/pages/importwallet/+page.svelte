<script>
  import toast from "svelte-french-toast";
  import { goto } from "$app/navigation";

  import { importWallet } from "$lib/lib/wallet/import.js";


  let importType = "mnemonic";
  let keyElement;

  async function restoreAccount() {
    await importWallet(keyElement, importType);

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
    <textarea bind:value={keyElement} class="textarea textarea-bordered textarea-md w-full h-28"></textarea>
  </div>
  <div class="grid grid-cols-1 mt-3">
    <button class="btn btn-primary" on:click={restoreAccount}>Import</button>
  </div>
</main>