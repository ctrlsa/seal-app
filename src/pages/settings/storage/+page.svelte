<script>
  import { isEmpty } from "moderndash";
  import { get } from "svelte/store";
  import toast from "svelte-french-toast";
  import CloudLightning from "svelte-lucide/CloudLightning.svelte";
  import Plug from "svelte-lucide/Plug.svelte";
  import RefreshCw from "svelte-lucide/RefreshCw.svelte";

  import { goto } from "$app/navigation";
  import { db } from "$lib/lib/db";
  import { setupStorageProvider } from "$lib/lib/storageProvider/setupProvider";
  import { syncUploads } from "$lib/lib/storageProvider/syncUploads.js";
  import { storageProvider,wallet } from "$lib/lib/stores/stores";
  import Confirm from "$lib/ui/modal/confirm.svelte";
  import Navbar from "$widgets/navbar.svelte";


  const storageProviderApiKey = $storageProvider.apiKey;

  let modalRenew;


  /** Resync file list from the provider (Lighthouse) */
  const resyncFiles = async () => {
    await db.files.clear();

    const sfPromise = syncUploads(storageProviderApiKey);

    await toast.promise(sfPromise, {
      loading: "Syncing file list",
      success: "File list was synchronized",
      error: "Could not synchronize file list"
    });

    goto("/myfiles", { replaceState: true });
  }

  /** Request a new API key */
  const requestNewApiKey = async (publicKey, privateKey) => {
    if (!isEmpty(get(wallet))) {
      const sspPromise = setupStorageProvider(publicKey, privateKey);

      await toast.promise(sspPromise, {
        loading: "Requesting a new API key...",
        success: "API key updated",
        error: "Could not get the API key"
      });
    } else {
      toast.error("Account not found");
    }
  }
</script>

<Navbar>Storage provider</Navbar>

<main class="flex-1 overflow-y-scroll px-3">
  <div class="mb-2">
    {#if !isEmpty($wallet)}
      <div class="text-lg mb-5 leading-none capitalize">
        <a href="{$storageProvider.website}" class="link" target="_blank"><CloudLightning class="h-5 w-5 float-left mr-1" /> {$storageProvider.name}</a>
      </div>

      <div class="flex flex-row gap-1.5 mb-3">
        <button class="btn btn-neutral shrink" on:click={resyncFiles}>
          <RefreshCw class="h-4 w-4" /> Resync files
        </button>
        <button class="btn btn-neutral grow" on:click={() =>{ modalRenew.showModal(); }}><Plug class="h-4 w-4" />Renew ApiKey</button>
      </div>
    {:else}
      <p>Create or restore an account to setup a storage provider</p>
    {/if}
  </div>
</main>

<Confirm bind:dialogConfirm={modalRenew}>
  <p slot="message" class="align-middle inline-block text-center text-lg">
    Do you want to renew the API key?
  </p>
  <button slot="button-cancel" class="btn btn-block btn-neutral"
          on:click={() => { modalRenew.close(); }}>
    Cancel
  </button>
  <button slot="button-confirm" class="btn btn-block btn-primary"
          on:click={async () => { modalRenew.close(); await requestNewApiKey($wallet.publicKey, $wallet.privateKey); }}>
    Renew
  </button>
</Confirm>