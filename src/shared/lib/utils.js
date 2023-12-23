import { isEmpty } from "moderndash";
import WebApp from "@twa-dev/sdk";


/** Detect Telegram Web App environment */
export function isTelegramWebApp() {
  return !isEmpty(WebApp.initDataUnsafe);
}

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

/** Universal link opener */
export function shareLink(url, text = "", instantView = true, openInTelegram = true) {
  if (isTelegramWebApp()) {
    const options = instantView ? {try_instant_view:true} : {};
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

/** Return wallet short address (display only!) */
export function shortAddr(addr) {
  return addr.substring(0, 6) + "..." + addr.substring(addr.length - 4);
}

export function extractThemeColorsFromDOM() {
  const computedStyles = getComputedStyle(document.querySelector(":root"));

  return {
    primary: `hsl(${computedStyles.getPropertyValue('--p')}`,
    primaryFocus: `hsl(${computedStyles.getPropertyValue('--pf')}`,
    primaryContent: `hsl(${computedStyles.getPropertyValue('--pc')}`,
    secondary: `hsl(${computedStyles.getPropertyValue('--s')}`,
    secondaryFocus: `hsl(${computedStyles.getPropertyValue('--sf')}`,
    secondaryContent: `hsl(${computedStyles.getPropertyValue('--sc')}`,
    accent: `hsl(${computedStyles.getPropertyValue('--a')}`,
    accentFocus: `hsl(${computedStyles.getPropertyValue('--af')}`,
    accentContent: `hsl(${computedStyles.getPropertyValue('--ac')}`,
    neutral: `hsl(${computedStyles.getPropertyValue('--n')}`,
    neutralFocus: `hsl(${computedStyles.getPropertyValue('--nf')}`,
    neutralContent: `hsl(${computedStyles.getPropertyValue('--nc')}`,
    base100: `hsl(${computedStyles.getPropertyValue('--b1')}`,
    base200: `hsl(${computedStyles.getPropertyValue('--b2')}`,
    base300: `hsl(${computedStyles.getPropertyValue('--b3')}`,
    baseContent: `hsl(${computedStyles.getPropertyValue('--bc')}`,
    info: `hsl(${computedStyles.getPropertyValue('--in')}`,
    infoContent: `hsl(${computedStyles.getPropertyValue('--inc')}`,
    success: `hsl(${computedStyles.getPropertyValue('--su')}`,
    successContent: `hsl(${computedStyles.getPropertyValue('--suc')}`,
    warning: `hsl(${computedStyles.getPropertyValue('--wa')}`,
    warningContent: `hsl(${computedStyles.getPropertyValue('--wac')}`,
    error: `hsl(${computedStyles.getPropertyValue('--er')}`,
    errorContent: `hsl(${computedStyles.getPropertyValue('--erc')}`,
  };
}