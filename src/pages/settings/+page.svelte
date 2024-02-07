<script>
  import Brush from "svelte-lucide/Brush.svelte";
  import CloudCog from "svelte-lucide/CloudCog.svelte";
  import Info from "svelte-lucide/Info.svelte";
  import Mail from "svelte-lucide/Mail.svelte";
  import Share2 from "svelte-lucide/Share2.svelte";
  import Wallet from "svelte-lucide/Wallet.svelte";

  import Navbar from "$widgets/navbar.svelte";
</script>


<Navbar>Settings</Navbar>

<main class="flex-1 overflow-y-scroll px-3 mt-2">
  <div class="mb-6">
    <div class="join join-vertical w-full">
      <a class="btn btn-block btn-lg btn-neutral join-item border-b-2 border-b-base-100 justify-start"
         href="/settings/wallet">
        <Wallet class="h-6 w-6 mr-1" /> Wallet
      </a>
      <a class="btn btn-block btn-lg btn-neutral join-item border-b-2 border-b-base-100 justify-start"
         href="/settings/storage">
        <CloudCog class="h-6 w-6 mr-1" /> Storage provider
      </a>
      <a class="btn btn-block btn-lg btn-neutral join-item justify-start"
         href="/settings/appearance">
        <Brush class="h-6 w-6 mr-1" /> Appearance
      </a>
    </div>
  </div>

  <div class="mb-8">
    <div class="join join-vertical w-full">
      <a class="btn btn-block btn-lg btn-neutral join-item border-b-2 border-b-base-100 justify-start"
         href="/contact">
        <Mail class="h-6 w-6 mr-1" /> Contact us
      </a>
      <a class="btn btn-block btn-lg btn-neutral join-item justify-start"
         href="/settings/tellfriends">
        <Share2 class="h-6 w-6 mr-1" /> Tell friends
      </a>
    </div>
  </div>

  <div class="mb-8">
    <a class="btn btn-block btn-lg btn-neutral join-item border-b-2 border-b-base-100 justify-start"
       href="/about">
      <Info class="h-6 w-6 mr-1" /> About app
    </a>
  </div>

  <div class="flex flex-col mb-8 items-center justify-center">
    <p class="text-center font-bold">SEAL ver. 0.2.1</p>
    <div class="divider w-28 self-center mb-0.5 mt-1"></div>
    <p class="text-center">decentralized app</p>
  </div>
</main>