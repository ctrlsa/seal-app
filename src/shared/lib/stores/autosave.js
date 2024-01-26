import onChange from "on-change";
import { writable } from "svelte/store";


/** Data store */
let data = {};

export function autosave(key, initialValue, options = {}) {
  const lazySave = options?.lazySave ?? false;
  const serializer = options?.serializer ?? JSON;
  const onError = options?.onError ?? ((e) => console.error(`Error when writing value from store "${key}" to localStorage`, e));
  const browser = typeof (window) !== 'undefined' && typeof (document) !== 'undefined';
  const storage = browser ? localStorage : null;


  function load() {
    const json = storage?.getItem(key)

    if (json) return serializer.parse(json);

    return initialValue;
  }

  function save(key, value) {
    try {
      storage?.setItem(key, serializer.stringify(value))
    } catch (e) {
      onError(e)
    }
  }

  function clear() {

  }

  if (!data[key]) {
    data = load();
  }

  const autosaveStore = onChange(data, function (path, value, previousValue, applyData) {
    save(key, this);

    console.log('this:', this);
    console.log('path:', path);
    console.log('value:', value);
    console.log('previousValue:', previousValue);
    console.log('applyData:', applyData);
  });

  if (!lazySave) {
    const storedData = storage?.getItem(key);

    if (null === storedData) save(key, data);
  }

  return autosaveStore;
}
