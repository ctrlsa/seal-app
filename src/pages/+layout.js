import { isEmpty } from "moderndash";
import { get } from "svelte/store";
import toast from "svelte-french-toast";
import { browser } from "$app/environment";
import { redirect } from "@sveltejs/kit";

import { wallet, storageProvider } from "$lib/lib/stores";
import { isAuthenticated } from "$lib/lib/auth";
import { setupStorageProvider } from "$lib/lib/storageProvider/setupProvider";


// Disable server-side rendering
export const ssr = false;


export async function load({ url }) {
  if (browser) {
    if (!url.pathname.startsWith("/onboarding") && !url.pathname.startsWith("/importwallet") && !url.pathname.startsWith("/settings")) {
      if (!isAuthenticated()) {
        console.warn("🔐 [CHECK:Auth] >>> Access denied 🛑");
        redirect(303, '/onboarding');
      } else {
        console.info("🔐 [CHECK:Auth] >>> Access granted 🟢");
      }
    }

    if (!isEmpty(get(wallet)) && isEmpty(get(storageProvider))) {
      const w = get(wallet);
      const publicKey = w.publicKey;
      const privateKey = w.privateKey;

      await toast.promise(setupStorageProvider(publicKey, privateKey), {
        loading: "Setting up a storage provider",
        success: "Storage provider has been set up",
        error: "Failed to setup storage provider"
      });
    }
  }



  return {};
}
