<script>
  import Navbar from "$widgets/navbar.svelte";
  import NavbarBottom from "$widgets/navbar-bottom.svelte";
</script>

<Navbar title={"Settings"} />
<div class="relative">
  <slot />
</div>
<NavbarBottom />
