import WebApp from "@twa-dev/sdk";
import Bowser from "bowser";
import { isEmpty } from "moderndash";

import { generateUniqueUserID } from "$lib/lib/account/id";
import { analytics } from "$lib/lib/analytics/analytics";
import { ANALYTICS_SERVICE } from "$lib/lib/config";
import { SETTINGS_KEY } from "$lib/lib/constants";
import { state } from "$lib/lib/stores/state";
import { settings } from "$lib/lib/stores/settings";
import { browser } from "$lib/lib/stores/stores";
import { capitalizeFirstLetter } from "$lib/lib/string";
import { enableThemeSupport } from "$lib/lib/theme";
import { isTelegramWebApp } from "$lib/lib/twa";



/** Check settings object version and migrate if possible */
if (!settings._version) {
  console.info("⚙️ [SETTINGS:Check] >>> Old version of 'settings' detected");
  console.info("⚙️ [SETTINGS:Migrate] >>> ☢️ Just nuke them!");
  localStorage.removeItem(SETTINGS_KEY);
} else {
  console.info("⚙️ [SETTINGS:Check] >>> Version is up to date. No action required");
}

/** Check state object version and migrate if possible */
if (!state._version) {
  console.info("🧬 [STATE:Check] >>> Old version of the app 'state' detected");
  console.info("🧬 [STATE:Migrate] >>> 🔄 Migrating app 'state'...");

  let wallet = localStorage.getItem("wallet");
  if (null !== wallet) {
    wallet = JSON.parse(wallet);

    /**
     * @TODO store wallet in IndexedDB
     */
    generateUniqueUserID(wallet.publicKey).then((id) => {
      state.wallet = {
        anonymizedID: id,
        address: wallet.address,
        publicKey: wallet.publicKey,
        privateKey: wallet.privateKey,
        mnemonicPhrase: wallet.mnemonicPhrase
      };
    });
    localStorage.removeItem("wallet");
  }

  let storageInfo = localStorage.getItem("storageInfo");
  if (null !== storageInfo) {
    storageInfo = JSON.parse(storageInfo);
    state.account.storage.info = storageInfo;
    localStorage.removeItem("storageInfo");
  }

  let storageProvider = localStorage.getItem("storageProvider");
  if (null !== storageProvider) {
    storageProvider = JSON.parse(storageProvider);

    state.account.storage.provider = {
      id: storageProvider.name.toLowerCase(),
      name: capitalizeFirstLetter(storageProvider.name),
      website: storageProvider.website,
      protocol: storageProvider.protocol,
      gatewayUrl: storageProvider.gatewayUrl,
      verifyUrl: storageProvider.verifyUrl,
      apiKey: storageProvider.apiKey
    };
    localStorage.removeItem("storageProvider");
  }

  console.info("🧬 [STATE:Migrate] >>> ✅ App 'state' successfully migrated");
} else {
  console.info("🧬 [STATE:Check] >>> Version is up to date. No action required");
}

/** Parse and store user agent data */
browser.set(Bowser.parse(window?.navigator.userAgent));

/** Initialize analytics */
if (settings.privacy.analytics === true) {
  if (!isEmpty(state.wallet) && state.wallet.anonymizedID) {
    analytics.init(state.wallet.anonymizedID, settings.privacy.analytics, ANALYTICS_SERVICE);
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

  /*
  Show settings button
  WebApp.SettingsButton.onClick(function() {
    window.open("/settings");
  });
  WebApp.SettingsButton.show();
  */

  // Request write access
  try {
    WebApp.requestWriteAccess(function(allowed) {
      if (allowed) {
        console.info("📬 [TELEGRAM:Request write access] >>> Access granted 🟢");
      } else {
        console.info("📬 [TELEGRAM:Request write access] >>> User declined the request 🛑");
      }
    });
  } catch (e) {
    console.error("📬 [TELEGRAM:Request write access] >>> Error processing request");
  }
}

/** Monitor Telegram/Browser theme change */
enableThemeSupport();
