<script>
  import Info from "svelte-lucide/Info.svelte";

  import Navbar from "$widgets/navbar.svelte";
</script>


<Navbar>About</Navbar>

<main class="flex-1 overflow-y-scroll px-3 mt-2">
  <div class="mb-8">

  </div>

  <div class="mb-8">
    <button class="btn btn-block btn-lg btn-neutral join-item border-b-2 border-b-base-100 justify-start">
      <Info class="h-6 w-6 mr-1" /> About app
    </button>
  </div>

  <div class="flex flex-col mb-8 items-center justify-center">
    <p class="text-center font-bold">SEAL ver. 0.2.1</p>
    <div class="divider w-28 self-center mb-0.5 mt-1"></div>
    <p class="text-center">decentralized app</p>
  </div>
</main>