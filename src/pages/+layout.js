import { redirect } from "@sveltejs/kit";

import { browser } from "$app/environment";
import { isAuthenticated } from "$lib/lib/auth";


// Disable server-side rendering
export const ssr = false;

export async function load({ url }) {
  if (browser) {
    if (!url.pathname.startsWith("/onboarding") &&
      !url.pathname.startsWith("/importwallet") &&
      !url.pathname.startsWith("/settings")) {
      if (!isAuthenticated()) {
        console.warn("🔐 [CHECK:Auth] >>> Access denied 🛑");
        redirect(303, '/onboarding');
      } else {
        console.info("🔐 [CHECK:Auth] >>> Access granted 🟢");
      }
    }
  }

  return {};
}
