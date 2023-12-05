<script>
  import "../app.css";

  import toast, { Toaster } from "svelte-french-toast";
  import { isEmpty } from "moderndash";
  import { get } from "svelte/store";
  import { onMount } from "svelte";
  import WebApp from "@twa-dev/sdk";
  import { goto, onNavigate } from "$app/navigation";

  import { storageProvider, wallet } from "$lib/lib/stores.js";
  import { setupStorageProvider } from "$lib/lib/storageProvider/setupProvider.js";


  async function initStorageProvider(publicKey, privateKey) {
    await setupStorageProvider(publicKey, privateKey);
  }

  /** Global app transitions */
  onNavigate((navigation) => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });

  // Initialize storage for new user
  if (isEmpty(get(storageProvider))) {
    initStorageProvider($wallet.publicKey, $wallet.privateKey);
    console.log("Initializing storage provider...");
  }

  /** Redirect from any page to the "Onboarding" page if there is no user account */
  if (isEmpty(get(wallet))) {
    goto("/onboarding", { replaceState: true });
  }

  /** Telegram Web app init & expand */
  onMount(() => {
    WebApp.ready();
    WebApp.expand();
  });
</script>

<svelte:head>
  <title>Seal</title>
</svelte:head>

<div class="container flex flex-col h-screen">
  <slot />
</div>

<Toaster />