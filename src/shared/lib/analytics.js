import posthog from "posthog-js";


export const _UMAMI = {
  websiteID: "2bc07745-4178-4ad7-a05e-365a0695c0a9",
  srcURL: "https://us.umami.is/script.js",
  settings: {
    hostURL: "",
    autoTrack: true,
    doNotTrack: false,
    enableCache: false,
    domains: "localhost,sealapi.ctrl.finance"
  }
};

export const _POSTHOG = {
  token: "phc_fjkCecVn2kto3pKIdKJScOYDOI0xC1Y8d89N5pFHUpB",
  config: {
    api_host: "https://app.posthog.com"
  }
};

export function initPosthog() {
  posthog.init(_POSTHOG.token, _POSTHOG.config);
}