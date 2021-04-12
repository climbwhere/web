import queryString from "query-string";
import { writable } from "svelte/store";

const createQueryStore = () => {
  const initialQuery =
    window.location.hash !== ""
      ? queryString.parse(window.location.hash)
      : {
          numberOfClimbers: 1,
          dateFilter: "all",
          gymFilter: "all",
          showAvailableOnly: false,
        };

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
