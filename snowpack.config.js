/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    src: "/",
    public: { url: "/", static: true, resolve: false },
  },
  plugins: [
    "@snowpack/plugin-svelte",
    "@snowpack/plugin-dotenv",
    [
      "snowpack-resolve-alias",
      {
        extension: [".js", ".svelte"],
        devPath: "src",
        noWarning: true,
      },
    ],
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    { match: "routes", src: ".*", dest: "/index.html" },
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
  alias: {
    "~": "./src/",
  },
};
