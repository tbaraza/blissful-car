const Router = require('express').Router();
const Search = require('./search.controller');

Router.route('/search').get(Search.defaultSearch);
Router.route('/search-filter').get(Search.filterSearch);

module.exports = Router;
