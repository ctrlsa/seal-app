<script>
  import { page } from "$app/stores";
  import { showBackButton } from "$lib/lib/twa";

  /** Show back button if we can go back */
  showBackButton($page.url.pathname);
</script>
