<script>
  import Navbar from "$widgets/navbar.svelte";
  import NavbarBottom from "$widgets/navbar-bottom.svelte";
  import ArrowLeft from "svelte-lucide/ArrowLeft.svelte";
  import WebApp from "@twa-dev/sdk";

  const BackButton = WebApp.BackButton;

  BackButton.show();
  BackButton.onClick(function() {
    window.history.back();
    WebApp.BackButton.hide();
  });

  /** <ArrowLeft class="h-8 w-8 float-left mr-2" /> */
</script>

<Navbar>Settings</Navbar>

<slot />