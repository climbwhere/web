/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    src: '/',
    public: { url: '/', static: true, resolve: false },
  },
  plugins: [
    '@snowpack/plugin-svelte',
    '@snowpack/plugin-dotenv',
    [
      'snowpack-resolve-alias',
      {
        extension: ['.js', '.svelte'],
        devPath: 'src',
        noWarning: true,
      },
    ],
    [
      'snowpack-plugin-markdown',
      {
        /*
           Pass options to `marked`. See a full list of options here:
           https://marked.js.org/using_advanced#options
        */
      },
    ],
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    { match: 'routes', src: '.*', dest: '/index.html' },
  ],
  optimize: {
    /* Example: Bundle your final build: */
    bundle: true,
    minify: true,
    treeshake: true,
    sourcemap: true,
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
    '~': './src/',
  },
};
