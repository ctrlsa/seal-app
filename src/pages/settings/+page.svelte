<script>
  import { blo } from "blo";
  import { get } from "svelte/store";
  import { isEmpty } from "moderndash";
  import { copy, copyText } from "svelte-copy";
  import toast from "svelte-french-toast";
  import { goto } from "$app/navigation";

  /** Icons */
  import CloudLightning from "svelte-lucide/CloudLightning.svelte";
  import Plug from "svelte-lucide/Plug.svelte";
  import RefreshCw from "svelte-lucide/RefreshCw.svelte";
  import Unlock from "svelte-lucide/Unlock.svelte";
  import Wallet from "svelte-lucide/Wallet.svelte";
  import XCircle from "svelte-lucide/XCircle.svelte";

  import { db } from "$lib/lib/db";
  import { wallet, storageProvider } from "$lib/lib/stores";
  import { deleteWallet } from "$lib/lib/wallet/delete";
  import { createNewWallet } from "$lib/lib/wallet/createNew";
  import { removeStorageProvider } from "$lib/lib/storageProvider/remove";
  import { setupStorageProvider } from "$lib/lib/storageProvider/setupProvider";
  import { syncUploads } from "$lib/lib/storageProvider/syncUploads.js";

  import Confirm from "$lib/ui/modal/confirm.svelte";


  const storageProviderApiKey = $storageProvider.apiKey;

  $: walletAddress = $wallet.address;
  $: walletMnemonic = $wallet.mnemonicPhrase;
  $: walletPrivateKey = $wallet.privateKey;
  $: accountBgImage = $wallet.publicKey ? blo($wallet.publicKey, 256) : "";

  let modalDelete;
  let modalRenew;

  /** Handle keypress on address */
  function copyOnKeypress(text, event) {
    if (event.keyCode === 13 || event.keyCode === 32) {
      copyText(text);
      toast.success("Address copied"); }
  }

  /** Delete account from local storage */
  const deleteAccount = async () => {
    await deleteWallet();
    await removeStorageProvider();
    await db.files.clear();

    // Toast some noise
    toast.success("User account removed");
    //await goto("/onboarding", { replaceState: true });
  }

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

  /** Create new user account (wallet) */
  async function createNewAccount() {
    if (isEmpty(get(wallet))) {
      await toast.promise(createNewWallet(), {
        loading: "Creating new account...",
        success: "New account created",
        error: "Could not create a new account"
      }).then(async () => {
        await requestNewApiKey($wallet.publicKey, $wallet.privateKey);
      });
    } else {
      toast.error("Account already exists");
    }
  }

  /** Go to restore account page */
  function restoreAccountHandler() {
    goto("/importwallet", { replaceState: true });
  }

  /** Share wallet
  function shareWalletHandler(address) {
    openLink("https://t.me/share/url?url=FilecoinAddress&text=" + address, false, true, true);
  }*/
</script>


<main class="flex-1 overflow-y-scroll px-3">
  <div class="mb-8">
    {#if !isEmpty($wallet)}
      <div class="hero rounded-box w-full mb-2 bg-repeat-x bg-left-top" style="background-image: url({accountBgImage});">
        <div class="hero-overlay rounded-box bg-opacity-60 w-full"></div>
        <div class="hero-content text-neutral-content w-full">
          <div class="w-full">
            <div class="font-bold text-white text-xl mb-4 leading-none">
              <Wallet class="h-5 w-5 float-left mr-1.5" /> Wallet
            </div>

            <div class="break-all font-mono text-base-content  bg-opacity-60 rounded-lg bg-base-100 mb-3 p-3"
               role="button" tabindex="0" use:copy={walletAddress} on:keyup={() => copyOnKeypress(walletAddress)}
               on:svelte-copy="{() => toast.success(`Address copied`)}"
            >{walletAddress}</div>

            <div class="flex flex-row gap-1.5">
              <button class="btn"
                      use:copy={walletMnemonic}
                      on:svelte-copy="{() => toast.success(`Mnemonic copied`)}">
                <Unlock class="h-4 w-4" /> Mnemonic
              </button>
              <button class="btn"
                      use:copy={walletPrivateKey}
                      on:svelte-copy="{() => toast.success(`Private key copied`)}">
                <Unlock class="h-4 w-4" /> Private Key
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="form-control">
        <button class="btn btn-error mb-2" on:click={() =>{ modalDelete.showModal(); }}>
          <XCircle class="h-4 w-4" /> Delete wallet
        </button>
      </div>
      <p class="text-sm"><strong>WARNING!</strong> This will permanently delete your wallet from this device! (private key, mnemonic)</p>
    {:else}
      <div class="w-full mb-2">
        <button class="btn btn-primary mr-2" on:click={createNewAccount}>New account</button>
        <button class="btn btn-neutral" on:click={restoreAccountHandler}>Restore account</button>
      </div>
    {/if}
  </div>

  <div class="mb-2">
    <h2 class="text-xl font-semibold mb-4">Storage provider</h2>
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

<Confirm bind:dialogConfirm={modalDelete}>
  <p slot="message" class="align-middle inline-block text-center text-lg">
    <strong class="text-error">WARNING!</strong> Your wallet, mnemonic, private key and files list will be deleted from this device! This can't be undone! Make sure to save mnemonic and private key
  </p>
  <button slot="button-cancel" class="btn btn-block btn-neutral"
          on:click={() => { modalDelete.close(); }}>
    Cancel
  </button>
  <button slot="button-confirm" class="btn btn-block btn-error"
          on:click={async () => { await deleteAccount(); modalDelete.close(); }}>
    Delete
  </button>
</Confirm>

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