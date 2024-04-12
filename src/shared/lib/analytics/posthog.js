//https://posthog.com/tutorials/svelte-analytics

/** Posthog settings */
const POSTHOG_API_HOST = "https://app.posthog.com";

export const POSTHOG_TOKEN = "phc_fjkCecVn2kto3pKIdKJScOYDOI0xC1Y8d89N5pFHUpB";

export const POSTHOG_CONFIG = {
  api_host: POSTHOG_API_HOST,
  advanced_disable_decide: true,
  advanced_disable_feature_flags: true,
  advanced_disable_feature_flags_on_first_load: true,
  autocapture: false,
  capture_pageview: false,
  capture_pageleave: false,
  disable_persistence: false,
  //disable_session_recording: true,
  mask_all_text: true,
  mask_all_element_attributes: true,
  opt_out_capturing_by_default: true,
  persistence: "localStorage"
};
