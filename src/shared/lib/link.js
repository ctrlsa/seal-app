import WebApp from "@twa-dev/sdk";

import { isTelegramWebApp } from "$lib/lib/twa";
import { analytics } from "$lib/lib/analytics/analytics.js";


/** Universal link opener */
export function openLink(url, target= "_blank", instantView = true, openInTelegram = false) {
  if (isTelegramWebApp()) {
    const options = instantView ? { try_instant_view: true } : {};

    if (openInTelegram) {
      WebApp.openTelegramLink(url);
    } else {
      WebApp.openLink(url, options);
    }
  } else {
    window.open(url, target);
  }
}

/** Universal link share */
export function shareLink(url, text = "", instantView = true, openInTelegram = true) {
  analytics.capture("file_shared", {
    via: "telegram"
  });

  if (isTelegramWebApp()) {
    const options = instantView ? { try_instant_view: true } : {};
    const shareURL = "https://t.me/share/url?url=" + url + "&text=" + text;

    if (openInTelegram) {
      WebApp.openTelegramLink(shareURL);
      window.blur();
    } else {
      WebApp.openLink(shareURL, options);
      window.blur();
    }
  } else {
    window.open(url);
  }
}
