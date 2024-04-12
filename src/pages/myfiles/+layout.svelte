<script>
  import { state } from "$lib/lib/stores/state";
  import Navbar from "$widgets/navbar.svelte";
  import { isEmpty } from "moderndash";
  import toast from "svelte-french-toast";
  import { setupStorageProvider } from "$lib/lib/storageProvider/setup.js";



  /** Ensure the storage provider */
  async function ensureStorageProvider() {
    if (!isEmpty(state.wallet) && isEmpty(state.account.storage.provider)) {
      await toast.promise(setupStorageProvider(state.wallet.publicKey, state.wallet.privateKey), {
        loading: "Setting up a storage provider",
        success: "Storage provider has been set up",
        error: "Failed to setup storage provider"
      });
    }
  }

  /** We need to make sure that the storage provider is set up */
  ensureStorageProvider();
</script>

<div class="flex flex-col h-screen">
  <Navbar address={state.wallet.address}>My Files</Navbar>

  <slot />
</div>
