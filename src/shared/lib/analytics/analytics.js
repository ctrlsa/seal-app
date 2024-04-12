import posthog from "posthog-js";

import { POSTHOG_TOKEN, POSTHOG_CONFIG } from "$lib/lib/analytics/posthog";



/** A-N-A-L-Y-T-I-C-S */
export const analytics = ((exports) => {
  let _initialized = false;
  let _service;


  /** Initialize analytics */
  function init(userID, optIn = false, service = "posthog") {
    let config, token;

    if ("posthog" === service) {
      _service = posthog;

      token = POSTHOG_TOKEN;
      config = POSTHOG_CONFIG;

      config.bootstrap = {
        distinctID: userID,
        isIdentifiedID: true
      };
    }

    _service.init(token, config);
    _initialized = true;

    let optedInCapturing = _service.has_opted_in_capturing();

    if (optIn && !optedInCapturing) {
      _service.opt_in_capturing();
    }
  }

  /**
   * Check analytics has been initialized
   * */
  function isInitialized() {
    return _initialized;
  }

  /**
   * Identify a user with a unique ID instead of a randomly generated ID
   * */
  function identify(userID, userProperties = {}, userPropertiesToSetOnce = {}) {
    if (_initialized) {
      _service.identify(userID, userProperties, userPropertiesToSetOnce);
      //console.log("Identified as: " + userID);
    }
  }

  /** Capture event */
  function capture(eventName, properties = null, options = {}) {
    if (_initialized) {
      _service.capture(eventName, properties, options);
      //console.log("Captured event: " + eventName);
    }
  }

  /**
   * Opt the user in to data capturing and cookies/localstorage for this PostHog instance
   * */
  function optInCapturing(options = {}) {
    if (_initialized) {
      _service.opt_in_capturing(options);
    }
  }

  /**
   * Opt the user out of data capturing and cookies/localstorage for this instance
   * */
  function optOutCapturing(options = {}) {
    if (_initialized) {
      _service.opt_out_capturing(options);
    }
  }

  /**
   * Check whether the user has opted in to data capturing and cookies/localstorage for this PostHog instance
   * */
  function hasOptedInCapturing(options = {}) {
    return _service.has_opted_in_capturing(options);
  }

  /**
   * Check whether the user has opted out of data capturing and cookies/localstorage for this PostHog instance
   * */
  function hasOptedOutCapturing(options = {}) {
    return _service.has_opted_out_capturing(options);
  }

  /**
   * Register a set of super properties, which are included with all events.
   * This will overwrite previous super property values, except for session properties
   * */
  function register(properties = {}, days = null) {
    if (_initialized) {
      _service.register(properties, days);
    }
  }

  /** Reset */
  function reset(resetDeviceId = false) {
    if (_initialized) {
      _service.reset(resetDeviceId);
    }
  }

  exports.capture = capture;
  exports.identify = identify;
  exports.init = init;
  exports.optInCapturing = optInCapturing;
  exports.optOutCapturing = optOutCapturing;
  exports.register = register;
  exports.reset = reset;

  return exports;
})({});