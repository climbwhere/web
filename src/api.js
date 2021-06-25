import fetch from "isomorphic-unfetch";
import moment from "moment";
const { SNOWPACK_PUBLIC_API_URL: API_URL } = import.meta.env;

export const getSessions = async () =>
  fetch(API_URL + "/sessions")
    .then((r) => r.json())
    .then(({ data: sessions }) => sessions)
    .then((sessions) =>
      sessions.map((session) => ({
        ...session,
        _time: moment(session.starts_at).format("hh:mmA"),
        _date: moment(session.starts_at).format("DD/MM/YY"),
      }))
    )
    .catch((error) => {
      console.error(error);
      throw error;
    });

export const getGyms = async () =>
  fetch(API_URL + "/gyms")
    .then((r) => r.json())
    .then(({ data }) => data)
    .catch((error) => {
      console.error(error);
      throw error;
    });

export const getLastUpdated = async () =>
  fetch(API_URL + "/snapshots/latest")
    .then((r) => r.json())
    .then(({ data: { created_at } }) => created_at)
    .catch((error) => {
      console.error(error);
      throw error;
    });

export const getScraperStatus = async () =>
  fetch(API_URL + "/snapshots/latest")
    .then((r) => r.json())
    .then(
      ({
        data: {
          data: { sessions },
        },
      }) => sessions
    )
    .catch((error) => {
      console.error(error);
      throw error;
    });

export const postReport = async (message) =>
  fetch(API_URL + "/report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  })
    .then((r) => r.ok)
    .catch((error) => {
      console.error(error);
      throw error;
    });
