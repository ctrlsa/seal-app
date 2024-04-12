import { STATE_KEY } from "$lib/lib/constants";
import { autosave } from "$lib/lib/stores/autosave";


/** Default app state */
const _DEFAULT_STATE = {
  account: {
    active: null,
    storage: {
      info: {
        used: 0,
        limit: 0
      },
      provider: {
        id: "",
        name: "",
        website: "",
        protocol: "",
        gatewayUrl: "",
        verifyUrl: "",
        apiKey: ""
      }
    },
    synced: false
  },
  wallet: {},
  _version: "001"
};

export const state = autosave(STATE_KEY, _DEFAULT_STATE);