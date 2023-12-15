<script>
  import "../app.css";

  import { onMount } from "svelte";
  import WebApp from "@twa-dev/sdk";
  import toast, { Toaster } from "svelte-french-toast";

  import { goto, onNavigate } from "$app/navigation";

  import { handleUITheme } from "$shared/lib/theme";



  /*  /!** Global app transitions *!/
    onNavigate((navigation) => {
      if (!document.startViewTransition) return;

      return new Promise((resolve) => {
        document.startViewTransition(async () => {
          resolve();
          await navigation.complete;
        });
      });
    });*/


  /** Telegram Web app init & expand */
  onNavigate(() => {
    WebApp.ready();
  });

  onMount(() => {
    WebApp.enableClosingConfirmation();
    WebApp.expand();

    handleUITheme();
  })

  goto("/myfiles", { replaceState: true });
</script>

<svelte:head>
  <title>Seal</title>
</svelte:head>

<div class="container flex flex-col h-screen w-full">
  <slot />
</div>

<Toaster />