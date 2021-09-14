import { readable, derived, Readable } from "svelte/store";
import orderBy from "lodash/orderBy.js";
import groupBy from "lodash/groupBy.js";
import isEmpty from "lodash/isEmpty.js";
import uniq from "lodash/uniq";
import dayjs from "dayjs";

import { getSnapshot } from "$lib/api";
import { DAYS_OF_WEEK, MONTHS } from "./constants";

const REFRESH_INTERVAL = 60000; // 1 minute interval

export const createSnapshotStore = (initialData: Snapshot) =>
  readable<Snapshot>(initialData, (set) => {
    const refresherInterval = setInterval(
      async () => getSnapshot().then(set),
      REFRESH_INTERVAL
    );
    return () => {
      clearInterval(refresherInterval);
    };
  });

export const getSessions = (snapshotStore: Readable<Snapshot>) =>
  derived([snapshotStore], ([$snapshot]) =>
    orderBy(
      Object.values($snapshot.data.sessions)
        .flatMap((ss) => ss.data)
        .filter((s) => s != null),
      "starts_at"
    )
  );

export const getDatesFromSessions = (sessionStore: Readable<Session[]>) =>
  derived<[Readable<Session[]>], string[]>([sessionStore], ([$sessions]) => {
    return uniq($sessions.map((s) => dayjs(s.starts_at).format("DD/ddd")));
  });

export const getTableDataFromSessions = (
  sessionStore: Readable<Session[]>,
  gymFilter: Readable<string[]>,
  dateFilter?: Readable<Date>
) =>
  derived(
    [sessionStore, gymFilter, dateFilter],
    ([$sessions, $gymFilters, $dateFilter]) => {
      let dateTimeSessions: {
        [date: string]: { [time: string]: Session[] };
      } = {};
      const filterDate = dayjs($dateFilter);
      let ss = $sessions;
      // filter gyms
      if (!isEmpty($gymFilters)) {
        ss = ss.filter((s) => $gymFilters.includes(s?.gym_id));
      }
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
        if (
          dateFilter != null &&
          `${DAYS_OF_WEEK[filterDate.day()]}, ${filterDate.format("D")} ${
            MONTHS[filterDate.month()]
          } ` !== date
        ) {
          return;
        }
        dateTimeSessions[date] = groupBy(ss, (session) =>
          dayjs(session.starts_at).format("DD/MM/YY hh:mmA")
        );
      });
      return dateTimeSessions;
    }
  );
