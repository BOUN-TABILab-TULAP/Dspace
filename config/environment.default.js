module.exports = {
  // Angular2 UI server settings.
  ui: {
    ssl: false,
    host: 'localhost',
    port: 3000,
    // NOTE: Space is capitalized because 'namespace' is a reserved string in TypeScript
    nameSpace: '/'
  },
  // The REST API server settings.
  rest: {
    ssl: false,
    host: 'dspace7.4science.it',
    port: 80,
    // NOTE: Space is capitalized because 'namespace' is a reserved string in TypeScript
    nameSpace: '/dspace-spring-rest/api'
  },
  cache: {
    // how long should objects be cached for by default
    msToLive: 15 * 60 * 1000, // 15 minute
    control: 'max-age=60' // revalidate browser
  },
  logDirectory: '.',
  // NOTE: rehydrate or replay
  // rehydrate will transfer prerender state to browser state, actions do not need to replay
  // replay will transfer an array of actions to browser, actions replay automatically
  prerenderStrategy: 'replay',
  // NOTE: will log all redux actions and transfers in console
  debug: true
};
