import { redirect } from "@sveltejs/kit";

import { browser } from "$app/environment";
import { isAuthenticated } from "$lib/lib/auth";
import { HOME_URL } from "$lib/lib/constants";



// Disable server-side rendering
export const ssr = false;

export async function load({ url }) {
  if (browser) {
    if (!url.pathname.startsWith("/onboarding") &&
      !url.pathname.startsWith("/account/create") &&
      !url.pathname.startsWith("/account/restore") &&
      !url.pathname.startsWith("/settings")) {
      if (!isAuthenticated()) {
        console.warn("🔐 [AUTH:Check] >>> 🛑 Access denied");
        redirect(303, '/onboarding');
      } else {
        console.info("🔐 [AUTH:Check] >>> 🟢 Access granted");

        if ("/" === url.pathname) {
          redirect(303, HOME_URL);
        }
      }
    }
  }

  return {};
}
