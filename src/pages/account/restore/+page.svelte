<script>
  import { isEmpty } from "moderndash";
  import toast from "svelte-french-toast";

  import { goto } from "$app/navigation";
  import { analytics } from "$lib/lib/analytics/analytics";
  import { ANALYTICS_SERVICE } from "$lib/lib/config";
  import { settings } from "$lib/lib/stores/settings";

  import Navbar from "$widgets/navbar.svelte";
  import { state } from "$lib/lib/stores/state";
  import { restoreAccount } from "$lib/lib/account/restore";



  let importType = "mnemonic";
  let keyInput;

  /** Restore user account **/
  async function restoreAcc() {
    await toast.promise(restoreAccount(keyInput, importType), {
      loading: "Restoring account...",
      success: "Account restored",
      error: "Failed to restore account"
    });

    if (!isEmpty(state.wallet)) {
      goto("/myfiles", { replaceState: true });
    } else {
      goto("/account/import", { replaceState: true });
    }
  }
</script>

<div class="flex flex-col h-screen">
  <Navbar>Restore account</Navbar>

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
      <button class="btn btn-primary" on:click={restoreAcc}>Restore</button>
    </div>
  </main>
</div>