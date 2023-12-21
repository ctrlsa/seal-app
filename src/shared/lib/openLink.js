import { isTelegramWebApp } from "$lib/lib/utils.js";
import WebApp from "@twa-dev/sdk";


/** Universal link opener */
export function openLink(url, target= "_blank", instantView = true, openInTelegram = false) {
  if (isTelegramWebApp()) {
    const options = instantView ? {try_instant_view:true} : {};

    if (openInTelegram) {
      WebApp.openTelegramLink(url);
    } else {
      WebApp.openLink(url, options);
    }
  } else {
    window.open(url, target);
  }
}