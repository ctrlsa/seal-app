import WebApp from "@twa-dev/sdk";
import Bowser from "bowser";
import { isEmpty } from "moderndash";
import { get } from "svelte/store";
import toast from "svelte-french-toast";

import { initPosthog } from "$lib/lib/analytics";
import { setupStorageProvider } from "$lib/lib/storageProvider/setupProvider.js";
import { browser, storageProvider, wallet } from "$lib/lib/stores/stores";
import { enableThemeSupport } from "$lib/lib/theme";
import { isTelegramWebApp } from "$lib/lib/utils";


/** Parse and store user agent data */
browser.set(Bowser.parse(window?.navigator.userAgent));

/** Ensure the storage provider */
async function ensureStorageProvider() {
  if (!isEmpty(get(wallet)) && isEmpty(get(storageProvider))) {
    const w = get(wallet);

    await toast.promise(setupStorageProvider(w.publicKey, w.privateKey), {
      loading: "Setting up a storage provider",
      success: "Storage provider has been set up",
      error: "Failed to setup storage provider"
    });
  }
}

/** Enable Telegram WebApp initial features */
if (isTelegramWebApp()) {
  if (!WebApp.isVersionAtLeast("6.2")) {
    console.error("🛑 This Telegram version is not supported");
    WebApp.showAlert("Please update your Telegram app to the latest version to use this app.");
  }

  // Expand app for better UX
  WebApp.expand();

  // Show settings button
/*  WebApp.SettingsButton.onClick(function() {
    window.open("/settings");
  });
  WebApp.SettingsButton.show();*/

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

/** We need to make sure that the storage provider is set up */
ensureStorageProvider();

/** Monitor Telegram/Browser theme change */
enableThemeSupport();

/** Initialize Posthog analytics */
//initPosthog();