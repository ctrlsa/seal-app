<script>
  import toast from "svelte-french-toast";

  import { goto } from "$app/navigation";
  import { createNewAccount } from "$lib/lib/account/create";

  import Navbar from "$widgets/navbar.svelte";

  // Assets import
  import FilecoinBg from "$lib/assets/images/filecoin-bg.png";
  import IPFSBg from "$lib/assets/images/ipfs-bg.jpg";


  async function createAccount() {
    try {
      await toast.promise(createNewAccount(), {
        loading: "Creating new account...",
        success: "New account created",
        error: "Could not create new account"
      });

      goto("/myfiles", { replaceState: true });
    } catch (e) {
      goto("/account/manage", { replaceState: true });
    }
  }
</script>

<div class="flex flex-col h-screen">
  <Navbar>Create new account</Navbar>

  <main class="grow px-2 mt-2">
    <div class="card card-action w-full bg-base-100 shadow-xl image-full mb-3" tabindex="0">
      <figure><img src="{FilecoinBg}" alt="Filecoin" /></figure>
      <div class="card-body">
        <h2 class="card-title">Filecoin</h2>
        <p>Decentralized, enterprise-grade persistent storage on blockchain</p>
        <div class="card-actions justify-end">
          <button class="btn btn-info" on:click={createAccount}>Create</button>
        </div>
      </div>
    </div>

    <div class="card card-action w-full bg-base-100 shadow-xl image-full" tabindex="0">
      <figure><img src="{IPFSBg}" alt="IPFS" /></figure>
      <div class="card-body">
        <h2 class="card-title">IPFS</h2>
        <p>Decentralized permanent storage without blockchain</p>
        <p>.</p>
        <div class="card-actions justify-end">
          <button class="btn btn-success">Coming soon...</button>
        </div>
      </div>
    </div>
  </main>
</div>

<style>
  .card-action:hover:before, .card-action:focus:before {
    opacity: 0.42;
  }
</style>