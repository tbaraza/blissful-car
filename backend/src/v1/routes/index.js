const version = process.env.API_VERSION || 'v1';
const apiPrefix = `/api/${version}`;

const SearchRoute = require('./search/search.route');

module.exports = (app) => {
  app.use(apiPrefix, SearchRoute);
  return app;
};
