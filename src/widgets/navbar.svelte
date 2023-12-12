<script>
  import toast from "svelte-french-toast";
  import { Wallet } from "lucide-svelte";
  import { copy, copyText } from "svelte-copy";

  import { shortAddr } from "$shared/lib/wallet/utils";


  export let address="";


  function copyOnKeypress(event) {
    if (event.keyCode === 13 || event.keyCode === 32) {
      copyText(address);
      toast.success("Address copied"); }
  }
</script>

<nav class="navbar sticky top-0 z-50 bg-base-100">
  <div class="navbar-start w-full">
    <span class="m-0 p-0 text-2xl font-bold">
      <slot />
    </span>
  </div>
  {#if address}
    <div class="navbar-end group">
      <span class="badge badge-neutral p-3 mt-1"
            use:copy={address} on:svelte-copy="{() => toast.success(`Address copied`)}"
            on:keyup={copyOnKeypress} tabindex="0" role="button">
        <Wallet class="h-3.5 w-3.5 mr-1.5" />{shortAddr(address)}
      </span>
    </div>
  {/if}
</nav>
