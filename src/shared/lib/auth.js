import { isEmpty } from "moderndash";

import { state } from "$lib/lib/stores/state";



export function isAuthenticated() {
  return !isEmpty(state.wallet);
}
