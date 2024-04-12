<script>
  import { goto } from "$app/navigation";

  // Assets import
  import Logo from "$lib/assets/images/logo.jpg";
</script>

<main class="flex grow items-center bg-black">
  <div class="text-center">
    <div class="w-full mb-5 px-9">
      <h1 class="text-5xl text-white font-bold">Seal</h1>
    </div>

    <img src="{Logo}" alt="" class="w-10/12 mx-auto">

    <div class="w-full mb-5 px-9">
      <p class="text-white">Decentralized permanent storage on IPFS/Filecoin. Censorship-resistant, Privacy-first, Open-source.</p>
    </div>

    <div class="w-full mt-7 mb-5">
      <button class="btn btn-primary mr-2" on:click={() => goto("/account/create", { replaceState: true })}>New account</button>
      <button class="btn btn-neutral" on:click={() => goto("/account/restore", { replaceState: true })}>Restore account</button>
    </div>
  </div>
</main>
