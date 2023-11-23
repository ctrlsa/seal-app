<script>
  import { Wallet } from "lucide-svelte";
  import toast from 'svelte-french-toast';
  import { copy } from 'svelte-copy';

  export let title="Title";
  export let address="";

  function shortAddr(addr) {
    return addr.substring(0, 6) + "..." + addr.substring(addr.length - 4);
  }
</script>

<nav class="navbar sticky top-0 z-10 bg-base-100">
  <div class="navbar-start">
    <h1 class="btn btn-ghost m-0 p-0 text-2xl normal-case">{title}</h1>
  </div>
  <div class="navbar-end group">
    {#if address}
      <span class="badge badge-neutral p-3 mt-1" use:copy={address}
            on:svelte-copy="{() => toast.success(`Copied!`)}">
        <Wallet class="h-3.5 w-3.5 mr-1.5" />{shortAddr(address)}
      </span>
    {/if}
  </div>
</nav>
