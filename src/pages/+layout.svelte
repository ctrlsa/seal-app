<script>
  import "../app.css";

  import { onMount } from "svelte";
  import WebApp from "@twa-dev/sdk";
  import toast, { Toaster } from "svelte-french-toast";

  import { goto, onNavigate } from "$app/navigation";


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
  onMount(() => {
    //WebApp.ready();
  });

  goto("/myfiles", { replaceState: true });
</script>

<svelte:head>
  <title>Seal</title>
</svelte:head>

<div class="container overflow-hidden overscroll-none">
  <slot />
</div>

<Toaster />