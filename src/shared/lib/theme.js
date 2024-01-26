import WebApp from "@twa-dev/sdk";
import { isEmpty } from "moderndash";

import { themes } from "$lib/lib/enums/themes";
import { settings } from "$lib/lib/stores/settings";
import { isTelegramWebApp } from "$lib/lib/utils";


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

  console.info("👀 [ADD:EventListener] >>> Theme change");
}

/** Change app theme */
export function changeTheme(theme) {
  if (theme && themes.includes(theme)) {
    document.documentElement.setAttribute("data-theme", theme);
  } else {
    console.error("Theme `" + theme + "` not supported");
  }
}

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