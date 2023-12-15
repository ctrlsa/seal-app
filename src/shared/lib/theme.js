import { isEmpty } from "moderndash";
import WebApp from "@twa-dev/sdk";

import { themes } from "$lib/lib/enums/themes";
import { isTelegramWebApp } from "$lib/lib/utils";


/** Get preferred color scheme (browser) */
const getPreferredColorScheme = () => window?.matchMedia?.("(prefers-color-scheme:dark)")?.matches ? "dark" : "light";

/** Add event for theme change */
export function watchThemeChange() {
  if (isTelegramWebApp()) {
    WebApp.onEvent("themeChanged", changeTheme);
  } else {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", changeTheme);
  }

  console.info("👀 [ADD:EventListener] >>> Theme change");
}

/** Change app theme */
export function changeTheme() {
  let colorScheme;

  if (isTelegramWebApp()) {
    colorScheme = WebApp.colorScheme;

    //document.body.style.background = color;
  } else {
    colorScheme = getPreferredColorScheme();
  }

  if (isEmpty(colorScheme)) colorScheme = "dark";

  if (colorScheme && themes.includes(colorScheme)) {
    document.documentElement.setAttribute("data-theme", colorScheme);
    window.localStorage.setItem("theme", colorScheme);
  }
}