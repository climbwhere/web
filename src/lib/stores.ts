import { readable, derived, Readable } from "svelte/store";
import groupBy from "lodash/groupBy.js";
import isEmpty from "lodash/isEmpty.js";
import dayjs from "dayjs";

import { getGyms, getLastUpdated, getSessions, getSnapshot } from "$lib/api";
import { DAYS_OF_WEEK, MONTHS } from "./constants";

const REFRESH_INTERVAL = 60000; // 1 minute interval

// export const createGymsStore = (initialData: Gym[]) =>
//   readable<Gym[]>(initialData, (set) => {
//     const refresherInterval = setInterval(
//       async () => getGyms().then(set),
//       REFRESH_INTERVAL
//     );
//     return () => {
//       clearInterval(refresherInterval);
//     };
//   });

// export const createSessionsStore = (initialData: Session[]) =>
//   readable<Session[]>(initialData, (set) => {
//     const refresherInterval = setInterval(
//       async () => getSessions().then(set),
//       REFRESH_INTERVAL
//     );
//     return () => {
//       clearInterval(refresherInterval);
//     };
//   });

// export const createLastUpdatedStore = (initialData: Date) =>
//   readable<Date>(initialData, (set) => {
//     const refresherInterval = setInterval(
//       async () => getLastUpdated().then(set),
//       REFRESH_INTERVAL
//     );
//     return () => {
//       clearInterval(refresherInterval);
//     };
//   });

// export const createScraperStatusStore = (initialData: Snapshot) =>
//   readable<Snapshot>(initialData, (set) => {
//     const refresherInterval = setInterval(
//       async () => getSnapshot().then(set),
//       REFRESH_INTERVAL
//     );
//     return () => {
//       clearInterval(refresherInterval);
//     };
//   });

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


export const getSessionsTableData = (
  snapshotStore: Readable<Snapshot>,
  gymFilter: Readable<string[]>,
  dateFilter?: Readable<Date>
) =>
  derived([snapshotStore, gymFilter, dateFilter], ([$snapshot, $gymFilter, $dateFilter]) => {
    let dateTimeSessions = {};
    const filterDate = dayjs($dateFilter);
    // filter gyms
    const ss = Object.values($snapshot.data.sessions).flatMap(s => s.data).filter((s) => $gymFilter.includes(s?.gym_id));
    console.info(ss);
    // group into date
    const dateSessions = groupBy(ss, (session) => {
      const date = dayjs(session.starts_at);
      return `${DAYS_OF_WEEK[date.day()]}, ${date.format("D")} ${MONTHS[date.month()]
        } `;
    });
    // group into time
    Object.keys(dateSessions).forEach((date) => {
      const ss = dateSessions[date];
      // filter date
      // if (dateFilter != null && `${DAYS_OF_WEEK[filterDate.day()]}, ${filterDate.format("D")} ${MONTHS[filterDate.month()]
      //   } ` === date) {
      //   return;
      // }
      dateTimeSessions[date] = groupBy(ss, (session) =>
        dayjs(session.starts_at).format("DD/MM/YY hh:mmA")
      );
    });
    return dateTimeSessions;
  });
