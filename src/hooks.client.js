import { changeTheme, watchThemeChange } from "$lib/lib/theme.js";
import WebApp from "@twa-dev/sdk";


/** Enable Telegram WebApp initial features */
WebApp.enableClosingConfirmation();
WebApp.expand();

/** Monitor Telegram/Browser theme change */
changeTheme();
watchThemeChange();