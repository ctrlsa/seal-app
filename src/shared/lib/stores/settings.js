import { SETTINGS_KEY } from "$lib/lib/constants";
import { autosave } from "$lib/lib/stores/autosave";


/** Default app settings */
const _DEFAULT_SETTINGS = {
  language: "system",
  theme: "system",
  files: {
    orderBy: "uploaded",
    orderByDesc: true
  },
  privacy: {
    analytics: true
  },
  storage: {
    info: {
      used: 0,
      limit: 0
    },
    provider: {
      id: "lighthouse",
      name: "Lighthouse",
      website: "https://lighthouse.storage",
      protocol: "filecoin",
      gatewayUrl: "https://gateway.lighthouse.storage/ipfs/",
      verifyUrl: "https://api.lighthouse.storage/api/auth/get_message?publicKey=",
      apiKey: ""
    }
  },
  wallet: {
    active: "default"
  },
  _version: "001"
};

export const settings = autosave(SETTINGS_KEY, _DEFAULT_SETTINGS);