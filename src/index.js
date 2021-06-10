import App from "./App.svelte";

const { SNOWPACK_PUBLIC_ENV: ENV } = import.meta.env;

let app = new App({
  target: document.body,
  props: { env: ENV },
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("./sw.js")
      .then((reg) => {
        console.log("Service worker registered");
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

export default app;
