import { isEmpty } from "moderndash";
import { get } from "svelte/store";
import { wallet } from "$lib/lib/stores/stores";


export function isAuthenticated() {
  return !isEmpty(get(wallet));
}