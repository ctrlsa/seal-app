<script>
  import "../app.css";

  import { Toaster } from "svelte-french-toast";

  import { analytics } from "$lib/lib/analytics/analytics";
  import { goto, onNavigate } from "$app/navigation";
  import { onMount } from "svelte";

  onMount(() => {
    analytics.capture("app_launched", { $event_type: "onetime" });
  });

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

  //goto("/myfiles", { replaceState: true });
</script>

<svelte:head>
  <title>Seal</title>
</svelte:head>

<div class="container overflow-hidden overscroll-none">
  <slot />
</div>

<Toaster />
