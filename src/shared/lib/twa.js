import WebApp from "@twa-dev/sdk";

import { HOME_URL } from "$lib/lib/constants";
import { isTelegramWebApp } from "$lib/lib/utils";


/** Universal code for Telegram Web App back button */
export function showBackButton(url) {
  if (!url.includes(HOME_URL)) {
    if (isTelegramWebApp()) {
      WebApp.BackButton.onClick(() => {
        window.history.go(-1);
        WebApp.BackButton.hide();
      });

      WebApp.BackButton.show();
    }
  }
}
