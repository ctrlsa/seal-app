import WebApp from "@twa-dev/sdk";

import { changeTheme, watchThemeChange } from "$lib/lib/theme.js";
import { isTelegramWebApp } from "$lib/lib/utils.js";
import { goto } from "$app/navigation";


/** Enable Telegram WebApp initial features */
if (isTelegramWebApp()) {
  if (!WebApp.isVersionAtLeast("6.2")) {
    console.error("🛑 This Telegram version is not supported");
    WebApp.showAlert("Please update your Telegram app to the latest version to use this app.");
  }

  // Expand app for better UX
  WebApp.expand();

/*  WebApp.SettingsButton.show().onClick(function() {
    window.open("/settings");
  });*/

  // Request write access
  try {
    WebApp.requestWriteAccess(function(allowed) {
      if (allowed) {
        console.info("⚙️ [REQUEST:Telegram Write Access] >>> Access granted 🟢");
      } else {
        console.info("⚙️ [REQUEST:Telegram Write Access] >>> User declined the request 🛑");
      }
    });
  } catch (e) {
    console.error("⚙️ [REQUEST:Telegram Write Access] >>> Error processing request");
  }
}

/** Monitor Telegram/Browser theme change */
changeTheme();
watchThemeChange();