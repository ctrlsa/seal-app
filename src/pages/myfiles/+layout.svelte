<script>
  import { wallet } from "$lib/lib/stores/stores";
  import Navbar from "$widgets/navbar.svelte";

  let address = $wallet.address;
</script>

<div class="flex flex-col h-screen">
  <Navbar address={address}>My Files</Navbar>

  <slot />
</div>
