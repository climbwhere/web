import { readable } from "svelte/store";

import { getGyms, getLastUpdated, getSessions } from "$lib/api";

const REFRESH_INTERVAL = 60000; // 1 minute interval

export const createGymsStore = (initialData: Gym[]) =>
  readable<Gym[]>(initialData, (set) => {
    const refresherInterval = setInterval(
      async () => getGyms().then(set),
      REFRESH_INTERVAL
    );
    return () => {
      clearInterval(refresherInterval);
    };
  });

export const createSessionsStore = (initialData: Session[]) =>
  readable<Session[]>(initialData, (set) => {
    const refresherInterval = setInterval(
      async () => getSessions().then(set),
      REFRESH_INTERVAL
    );
    return () => {
      clearInterval(refresherInterval);
    };
  });

export const createLastUpdatedStore = readable<Date>(null, (set) => {
  const refresherInterval = setInterval(
    async () => getLastUpdated().then(set),
    REFRESH_INTERVAL
  );
  return () => {
    clearInterval(refresherInterval);
  };
});
