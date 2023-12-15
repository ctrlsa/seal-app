<script>
  import { wallet } from "$shared/lib/stores";

  import Navbar from "$widgets/navbar.svelte";
  import NavbarBottom from "$widgets/navbar-bottom.svelte";

  let address = $wallet.address;
</script>

<Navbar address={address}>My Files</Navbar>

<slot />
