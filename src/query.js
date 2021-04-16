import queryString from "query-string";
import { writable } from "svelte/store";

import { defaultFilterState } from "./constants";

const createQueryStore = () => {
  const initialQuery =
    window.location.hash !== ""
      ? queryString.parse(window.location.hash)
      : defaultFilterState;

  const { subscribe, set } = writable(initialQuery);

  return {
    subscribe,
    set: (newValue) => {
      window.location.hash = queryString.stringify(newValue);
      set(newValue);
    },
    update: (updateFn) => {
      const newValue = updateFn(queryString.parse(window.location.hash));
      window.location.hash = queryString.stringify(newValue);
      set(newValue);
    },
  };
};

export const query = createQueryStore();
