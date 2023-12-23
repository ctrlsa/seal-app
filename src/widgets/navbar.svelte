<script>
  import { copy, copyText } from "svelte-copy";
  import toast from "svelte-french-toast";

  import Wallet from "svelte-lucide/Wallet.svelte";
  import Settings from "svelte-lucide/Settings.svelte";

  import { shortAddr } from "$shared/lib/utils";


  export let address="";


  const copyError = (event) => {
    console.error(event.detail.message);
  };

  function copyOnKeypress(event) {
    if (event.keyCode === 13 || event.keyCode === 32) {
      copyText(address);
      toast.success("Address copied"); }
  }
</script>

<nav class="navbar flex-none">
  <div class="navbar-start w-full">
    <span class="m-0 p-0 text-2xl font-bold">
      <slot />
    </span>
  </div>
  {#if address}
    <div class="navbar-end">
      <span class="badge badge-neutral p-3 mt-1"
            use:copy={address} on:svelte-copy="{() => toast.success(`Address copied`)}"
            on:svelte-copy:error={copyError} on:keyup={copyOnKeypress} tabindex="0" role="button">
        <Wallet class="h-3.5 w-3.5 mr-1.5" />{shortAddr(address)}
      </span>
      <a class="btn btn-ghost p-3 px-1 ml-1" href="/settings">
        <Settings class="h-7 w-7" />
      </a>
    </div>
  {/if}
</nav>
