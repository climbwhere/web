import  orderBy  from "lodash/orderBy";
import flatten from "lodash/flatten";
import fetch from "isomorphic-unfetch";
const { SNOWPACK_PUBLIC_API_URL: API_URL } = import.meta.env;

export const getLatestSnapshot = async () =>
  fetch(API_URL + "/snapshots/latest")
    .then((r) => r.json())
    .then(
      ({
        data: {
          created_at,
          data: { sessions, gyms },
          has_errors,
        },
      }) => {
        const sessionsList = orderBy(flatten(
          Object.values(sessions).map((d) => d.data)
        ).filter(s => s !== undefined), "starts_at");

        return {
          lastUpdated: created_at,
          sessions: sessionsList,
          gyms,
          hasErrors: has_errors,
        };
      }
    )
    .catch((error) => {
      console.error(error);
      throw error;
    });

export const postReport = async (message) =>
  fetch(API_URL + "/feedback/report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  })
    .then((r) => r.ok)
    .catch((error) => {
      console.error(error);
      throw error;
    });
