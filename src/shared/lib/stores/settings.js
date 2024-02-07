import { SETTINGS_KEY } from "$lib/lib/constants";
import { autosave } from "$lib/lib/stores/autosave";


/** Default app settings */
const defaultSettings = {
  language: "system",
  theme: "system",
  files: {
    orderBy: "uploaded",
    orderByDesc: true
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
  }
};

export const settings = autosave(SETTINGS_KEY, defaultSettings);