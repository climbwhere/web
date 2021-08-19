import { readable, derived, Readable } from "svelte/store";
import groupBy from "lodash/groupBy.js";
import uniqBy from "lodash/uniqBy.js";
import dayjs from "dayjs";

import { getGyms, getLastUpdated, getSessions } from "$lib/api";
import { DAYS_OF_WEEK } from "./constants";

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

export const createLastUpdatedStore = (initialData: Date) =>
  readable<Date>(initialData, (set) => {
    const refresherInterval = setInterval(
      async () => getLastUpdated().then(set),
      REFRESH_INTERVAL
    );
    return () => {
      clearInterval(refresherInterval);
    };
  });

export const getSessionsByDateTime = (sessionStore: Readable<Session[]>) =>
  derived(sessionStore, ($sessions: Session[]) => {
    let dateTimeSessions = {};
    const dateSessions = groupBy($sessions, (session) => {
      const date = dayjs(session.starts_at);
      return `${DAYS_OF_WEEK[date.day()]}, ${date.format("DD/MM/YY")}`;
    });
    Object.keys(dateSessions).forEach((date) => {
      const ss = dateSessions[date];
      dateTimeSessions[date] = groupBy(ss, (session) =>
        dayjs(session.starts_at).format("DD/MM/YY hh:mmA")
      );
    });
    return dateTimeSessions;
  });
