<script>
  import Settings from "svelte-lucide/Settings.svelte";
  import Wallet from "svelte-lucide/Wallet.svelte";

  import { shortAddr } from "$shared/lib/utils";
  import BackButton from "$shared/ui/button/back.svelte";


  export let address="";
</script>

<BackButton />

<nav class="navbar flex-none">
  <div class="navbar-start w-full">
    <span class="m-0 p-0 text-2xl font-bold">
      <slot />
    </span>
  </div>
  {#if address}
    <div class="navbar-end">
      <a class="badge badge-neutral p-3 mt-1" href="/settings/wallet">
        <Wallet class="h-3.5 w-3.5 mr-1.5" />{shortAddr(address)}
      </a>
      <a class="btn btn-ghost p-3 px-1 ml-1" href="/settings">
        <Settings class="h-7 w-7" />
      </a>
    </div>
  {/if}
</nav>