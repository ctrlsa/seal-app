<script>
  import WebApp from "@twa-dev/sdk";

  import { page } from "$app/stores";
  import { HOME_URL } from "$lib/lib/constants";
  import { isTelegramWebApp } from "$lib/lib/twa";


  let url = $page.url.pathname;

  /** Show Telegram back button if we can go back */
  if (!url.includes(HOME_URL)) {
    if (isTelegramWebApp()) {
      WebApp.BackButton.onClick(() => {
        window.history.go(-1);
        WebApp.BackButton.hide();
      });

      WebApp.BackButton.show();
    }
  }
</script>
