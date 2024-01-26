<script>
  import Brush from "svelte-lucide/Brush.svelte";
  import CloudCog from "svelte-lucide/CloudCog.svelte";
  import Info from "svelte-lucide/Info.svelte";
  import Mail from "svelte-lucide/Mail.svelte";
  import Share2 from "svelte-lucide/Share2.svelte";
  import Wallet from "svelte-lucide/Wallet.svelte";

  import { goto } from "$app/navigation";
  import Navbar from "$widgets/navbar.svelte";
</script>


<Navbar>Settings</Navbar>

<main class="flex-1 overflow-y-scroll px-3 mt-2">
  <div class="mb-6">
    <div class="join join-vertical w-full">
      <button class="btn btn-block btn-lg join-item border-b-2 border-b-base-100 justify-start"
              on:click={() => goto("/settings/wallet")}>
        <Wallet class="h-6 w-6 mr-1" /> Wallet
      </button>
      <button class="btn btn-block btn-lg join-item border-b-2 border-b-base-100 justify-start"
              on:click={() => goto("/settings/storage")}>
        <CloudCog class="h-6 w-6 mr-1" /> Storage provider
      </button>
      <button class="btn btn-block btn-lg join-item justify-start">
        <Brush class="h-6 w-6 mr-1" /> Appearance
      </button>
    </div>
  </div>


  <div class="mb-8">
    <div class="join join-vertical w-full">
      <button class="btn btn-block btn-lg join-item border-b-2 border-b-base-100 justify-start"
              on:click={() => goto("/settings/contact")}>
        <Mail class="h-6 w-6 mr-1" /> Contact us
      </button>
      <button class="btn btn-block btn-lg join-item justify-start"
              on:click={() => goto("/settings/tellfriends")}>
        <Share2 class="h-6 w-6 mr-1" /> Tell friends
      </button>
    </div>
  </div>

  <div class="mb-8">
    <button class="btn btn-block btn-lg join-item border-b-2 border-b-base-100 justify-start"
            on:click={() => goto("/settings/about")}>
      <Info class="h-6 w-6 mr-1" /> About app
    </button>
  </div>

  <div class="flex flex-col mb-8 items-center justify-center">
    <p class="text-center font-bold">SEAL ver. 0.2.0</p>
    <div class="divider w-28 self-center mb-0.5 mt-1.5"></div>
    <p class="text-center">decentralized app</p>
  </div>
</main>