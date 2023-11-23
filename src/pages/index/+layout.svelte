<script>
  import { wallet } from "$shared/lib/stores";

  import Navbar from "$widgets/navbar.svelte";
  import NavbarBottom from "$widgets/navbar-bottom.svelte";
  import { Plus } from "lucide-svelte";
  import Button from "$lib/ui/button/button.svelte";

  let address = $wallet.ethAddress;
</script>

<Navbar title={"My Files"} address={address}>
    <Button class="btn btn-circle btn-md">
      <Plus class="h-7 w-7" />
    </Button>
</Navbar>

<div class="container mx-auto">
  <slot />
</div>

<NavbarBottom />
