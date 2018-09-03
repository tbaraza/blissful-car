const version = process.env.API_VERSION || 'v1';
const apiPrefix = `/api/${version}`;

const defaultSearchRoute = require('./search/search.route');

module.exports = (app) => {
  app.use(apiPrefix, defaultSearchRoute);
  return app;
};
