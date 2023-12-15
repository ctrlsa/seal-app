<script>
  import { blo } from "blo";
  import { get } from "svelte/store";
  import { isEmpty } from "moderndash";
  import { copy, copyText } from "svelte-copy";
  import toast from "svelte-french-toast";
  import { goto } from "$app/navigation";

  /** Icons */
  import Copy from "svelte-lucide/Copy.svelte";
  import CloudLightning from "svelte-lucide/CloudLightning.svelte";
  import Share2 from "svelte-lucide/Share2.svelte";
  import Wallet from "svelte-lucide/Wallet.svelte";
  import XCircle from "svelte-lucide/XCircle.svelte";

  import { db } from "$lib/lib/db";
  import { wallet, storageProvider } from "$lib/lib/stores";
  import { deleteWallet } from "$lib/lib/wallet/delete";
  import { createNewWallet } from "$lib/lib/wallet/createNew";
  import { removeStorageProvider } from "$lib/lib/storageProvider/remove";
  import { setupStorageProvider } from "$lib/lib/storageProvider/setupProvider";


  $: walletAddress = $wallet.address;
  $: walletMnemonic = $wallet.mnemonicPhrase;
  $: walletPrivateKey = $wallet.privateKey;
  $: accountBgImage = $wallet.publicKey ? blo($wallet.publicKey, 256) : "";


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

  /** Share wallet */
  function shareWalletHandler() {
    toast("Not implemented...", {
      icon: "🌚",
      position: "bottom-center",
    });
  }
</script>

<main class="flex-1 overflow-y-scroll px-3">
  <div class="mb-8">
    <p class="text-xl font-bold mb-2">My account</p>

    {#if !isEmpty($wallet)}
      <div class="hero rounded-box w-full mb-2 bg-repeat-x bg-left-top" style="background-image: url({accountBgImage});">
        <div class="hero-overlay rounded-box bg-opacity-60 w-full"></div>
        <div class="hero-content text-neutral-content w-full">
          <div class="w-full">

            <div class="mb-4 font-bold text-xl leading-none">
              <Wallet class="h-5 w-5 float-left mr-1.5" /> Wallet
            </div>
            <p class="font-mono break-all mb-3 bg-opacity-40 bg-base-100 p-3 rounded-lg">{walletAddress}</p>
            <div>
              <button class="btn"
                      use:copy={walletAddress} on:keyup={copyOnKeypress(walletAddress)}
                      on:svelte-copy="{() => toast.success(`Address copied`)}"
              >
                <Copy class="h-4 w-4" /> Copy
              </button>
              <button class="btn" on:click={shareWalletHandler}>
                <Share2 class="h-4 w-4" /> Share
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="form-control">
        <button class="btn btn-neutral mb-2"
                use:copy={walletMnemonic}
                on:svelte-copy="{() => toast.success(`Mnemonic copied`)}">
          <Copy class="h-4 w-4" /> Copy mnemonic phrase
        </button>
      </div>
      <div class="form-control mb-3">
        <button class="btn btn-neutral mb-2"
                use:copy={walletPrivateKey}
                on:svelte-copy="{() => toast.success(`Private key copied`)}">
          <Copy class="h-4 w-4" /> Copy private Key
        </button>
      </div>
      <div class="form-control">
        <button class="btn btn-error mb-2" on:click={deleteAccount}>
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
    <p class="text-xl font-semibold mb-4">Storage provider</p>
    {#if !isEmpty($wallet)}
      <div class="text-lg mb-5 leading-none capitalize">
        <a href="{$storageProvider.website}" class="link" target="_blank"><CloudLightning class="h-5 w-5 float-left mr-1" /> {$storageProvider.name}</a>
      </div>

      <div class="form-control">
        <button class="btn btn-neutral mb-2" on:click={requestNewApiKey($wallet.publicKey, $wallet.privateKey)}>
          Request new ApiKey
        </button>
      </div>
    {:else}
      <p>Create or restore an account to setup a storage provider</p>
    {/if}
  </div>
</main>
