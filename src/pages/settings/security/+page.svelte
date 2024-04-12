<script>
  import { isEmpty } from "moderndash";

  import { analytics } from "$lib/lib/analytics/analytics";
  import { ANALYTICS_SERVICE } from "$lib/lib/config";
  import { settings } from "$lib/lib/stores/settings";
  import { state } from "$lib/lib/stores/state";

  import Navbar from "$widgets/navbar.svelte";
  import Ghost from "svelte-lucide/Ghost.svelte";



  /** Toggle anonymous usage */
  const toggleAnalytics = () => {
    if (settings.privacy.analytics) {
      analytics.capture("opt_out");
      analytics.optOutCapturing();
      analytics.reset();
    } else {
      if (!isEmpty(state.wallet) && state.wallet.anonymizedID) {
        analytics.init(state.wallet.anonymizedID, true, ANALYTICS_SERVICE);
      }
    }
  }
</script>


<Navbar>Security and Privacy</Navbar>

<main class="flex-1 overflow-y-scroll px-3 mt-2">
  <div class="mb-8">
    <div class="btn btn-block btn-lg btn-neutral flex">
      <Ghost class="h-6 w-6 mr-1 shrink" />
      <p class="grow text-left">Anonymous usage</p>
      <input type="checkbox" class="toggle toggle-primary" on:click={toggleAnalytics} bind:checked={settings.privacy.analytics} />
    </div>
  </div>
</main>