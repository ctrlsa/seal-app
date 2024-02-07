<script>
  import toast from "svelte-french-toast";
  import { isEmpty } from "moderndash";
  import { get } from "svelte/store";
  import { goto } from "$app/navigation";

  import { wallet } from "$lib/lib/stores/stores";
  import { createNewWallet } from "$lib/lib/wallet/createNew";

  // Assets import
  import Logo from "$lib/assets/images/logo.jpg";


  /** Create new user account (wallet) */
  async function createNewAccount() {
    if (isEmpty(get(wallet))) {
      await toast.promise(createNewWallet(), {
        loading: "Creating new account...",
        success: "New account created",
        error: "Could not create a new account"
      });
    } else {
      toast.error("Account already exists");
      return;
    }

    await goto("/myfiles", { replaceState: true });
  }

  /** Go to restore account page */
  function restoreAccountHandler() {
    goto("/importwallet", { replaceState: true });
  }
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
      <button class="btn btn-primary mr-2" on:click={createNewAccount}>New account</button>
      <button class="btn btn-neutral" on:click={restoreAccountHandler}>Restore account</button>
    </div>
  </div>
</main>
