import WebApp from "@twa-dev/sdk";
import { isEmpty } from "moderndash";

import { themes } from "$lib/lib/enums/themes";
import { settings } from "$lib/lib/stores/settings";
import { isTelegramWebApp } from "$lib/lib/twa";


/** Get preferred color scheme (browser) */
const getPreferredColorScheme = () => window?.matchMedia?.("(prefers-color-scheme:dark)")?.matches ? "dark" : "light";

/** Enable theme support */
export function enableThemeSupport() {
  if (settings.theme === "system" || isEmpty(settings.theme)) {
    // Autodetect system theme
    detectAndChangeTheme();

    // Add watcher to monitor theme change by user
    watchThemeChange();
  } else {
    changeTheme(settings.theme);
  }
}

/** Add event for theme change */
export function watchThemeChange() {
  if (isTelegramWebApp()) {
    WebApp.onEvent("themeChanged", detectAndChangeTheme);
  } else {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", detectAndChangeTheme);
  }

  console.info("🎨 [THEME:Add event listener] >>> 👀 Theme change");
}

/** Change app theme */
export function changeTheme(theme) {
  if (theme && themes.hasOwnProperty(theme)) {
    document.documentElement.setAttribute("data-theme", theme);
  } else {
    console.error("Theme `" + theme + "` not supported");
  }
}

/** Detect theme */
export function detectAndChangeTheme() {
  let colorScheme;

  // Get preferred color scheme
  if (isTelegramWebApp()) {
    colorScheme = WebApp.colorScheme;
  } else {
    colorScheme = getPreferredColorScheme();
  }

  // Set to default value if something went wrong
  if (isEmpty(colorScheme)) colorScheme = "dark";

  // Change app theme
  changeTheme(colorScheme);
}

/** Extract theme colors from DOM */
export function extractThemeColors() {
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
