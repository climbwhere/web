import fetch from "isomorphic-unfetch";
const APIURL = "http://localhost:3030";

export const getSessions = async () => {
  fetch(APIURL + "/sessions")
    .then((r) => r.json())
    .then(({ data }) => console.info(data));
};
