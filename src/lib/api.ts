const { VITE_API_URL: API_URL } = import.meta.env;

export const getSessions = async () =>
  fetch(API_URL + "/sessions")
    .then((r) => r.json())
    .then(({ data: sessions }) => sessions as Session[])
    .catch((error) => {
      console.error(error);
      throw error;
    });

export const getGyms = async () =>
  fetch(API_URL + "/gyms")
    .then((r) => r.json())
    .then(({ data }) => data as Gym[])
    .catch((error) => {
      console.error(error);
      throw error;
    });

export const getLastUpdated = async () =>
  fetch(API_URL + "/snapshots/latest")
    .then((r) => r.json())
    .then(({ data: { created_at } }) => created_at as Date)
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
