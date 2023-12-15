import { isEmpty } from "moderndash";
import WebApp from "@twa-dev/sdk";

import { themes } from "$lib/lib/enums/themes";
import { isTelegramWebApp } from "$lib/lib/utils";


/** Get preferred color scheme from browser */
export const getPreferredColorScheme = () => window?.matchMedia?.("(prefers-color-scheme:dark)")?.matches ? "dark" : "light";

/** Add event for theme change */
export function handleUITheme() {
  if (isTelegramWebApp()) {
    WebApp.onEvent("themeChanged", changeTheme);
  } else {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", changeTheme);
  }
}

/** Change theme */
export function changeTheme() {
  let colorScheme;

  if (isTelegramWebApp()) {
    console.log("Running in Telegram");
    colorScheme = WebApp.colorScheme;

    document.body.style.background = color;
  } else {
    console.log("Running in browser");
    colorScheme = getPreferredColorScheme();
  }

  console.log(colorScheme);

  if (isEmpty(colorScheme)) {
    colorScheme = "dark";
  }

  if (colorScheme && themes.includes(colorScheme)) {
    document.documentElement.setAttribute("data-theme", colorScheme);
    window.localStorage.setItem("theme", colorScheme);
  }
}