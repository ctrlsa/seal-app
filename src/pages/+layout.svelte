<script>
  import "../app.css";

  //import { UmamiAnalytics } from "@sveltinio/services/umami";
  import { Toaster } from "svelte-french-toast";

  import { goto, onNavigate } from "$app/navigation";
  //import { _UMAMI } from "$lib/lib/analytics";



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

  goto("/myfiles", { replaceState: true });
</script>

<!--<UmamiAnalytics
  websiteID={_UMAMI.websiteID}
  srcURL={_UMAMI.srcURL}
  settings="{_UMAMI.settings}"
/>-->

<svelte:head>
  <title>Seal</title>
</svelte:head>

<div class="container overflow-hidden overscroll-none">
  <slot />
</div>

<Toaster />
