import { isEmpty } from "moderndash";
import { get } from "svelte/store";
import { wallet } from "$lib/lib/stores.js";


export function isAuthenticated() {
  return !isEmpty(get(wallet));
}