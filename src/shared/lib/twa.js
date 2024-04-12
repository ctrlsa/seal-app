/**
 * Telegram Web App functions
 **/
import { isEmpty } from "moderndash";
import WebApp from "@twa-dev/sdk";


/** Detect Telegram Web App environment */
export function isTelegramWebApp() {
  return !isEmpty(WebApp.initDataUnsafe);
}
