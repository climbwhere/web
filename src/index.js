import App from "./App.svelte";

let app = new App({
  target: document.body,
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("./sw.js").then((reg) => {
      console.log("Service worker registered");
    }).catch(error => {
        console.error(error);
    });
  });
}

export default app;
