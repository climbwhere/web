const { VITE_API_URL: API_URL } = import.meta.env;

export const getSnapshot = async () =>
  fetch(API_URL + "/snapshots/latest")
    .then((r) => r.json())
    .then(({ data }) => data as Snapshot)
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
