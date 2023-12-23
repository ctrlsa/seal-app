<script>
  import { wallet } from "$shared/lib/stores";

  import Navbar from "$widgets/navbar.svelte";


  let address = $wallet.address;
</script>

<Navbar address={address}>My Files</Navbar>

<slot />
