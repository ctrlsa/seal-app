<script>
  import { initBackButton } from "$shared/lib/twa";
  import Navbar from "$widgets/navbar.svelte";

  initBackButton();
</script>

<div class="flex flex-col h-screen">
  <Navbar>Share file</Navbar>

  <slot />
</div>