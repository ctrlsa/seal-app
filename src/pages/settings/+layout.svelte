<script>
  import { initBackButton } from "$shared/lib/twa";
  import Navbar from "$widgets/navbar.svelte";

  initBackButton();
</script>

<Navbar>Settings</Navbar>

<slot />