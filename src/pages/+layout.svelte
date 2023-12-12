<script>
  import "../app.css";

  import toast, { Toaster } from "svelte-french-toast";
  import { onMount } from "svelte";
  import WebApp from "@twa-dev/sdk";
  import { onNavigate } from "$app/navigation";


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