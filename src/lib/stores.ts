import { readable, derived, Readable } from "svelte/store";
import groupBy from "lodash/groupBy.js";
import isEmpty from "lodash/isEmpty.js";
import dayjs from "dayjs";

import { getGyms, getLastUpdated, getSessions } from "$lib/api";
import { DAYS_OF_WEEK, MONTHS } from "./constants";

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

export const getSessionsTableData = (
  sessionStore: Readable<Session[]>,
  gymFilter: Readable<string[]>
) =>
  derived([sessionStore, gymFilter], ([$sessions, $gymFilter]) => {
    let dateTimeSessions = {};
    // filter gyms
    const ss = isEmpty($gymFilter)
      ? $sessions
      : $sessions.filter((s) => $gymFilter.includes(s.gym.slug));
    // group into date
    const dateSessions = groupBy(ss, (session) => {
      const date = dayjs(session.starts_at);
      return `${DAYS_OF_WEEK[date.day()]}, ${date.format("D")} ${
        MONTHS[date.month()]
      } `;
    });
    // group into time
    Object.keys(dateSessions).forEach((date) => {
      const ss = dateSessions[date];
      dateTimeSessions[date] = groupBy(ss, (session) =>
        dayjs(session.starts_at).format("DD/MM/YY hh:mmA")
      );
    });
    return dateTimeSessions;
  });
