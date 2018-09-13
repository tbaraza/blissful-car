const Router = require('express').Router();
const SearchController = require('./search.controller');

Router.route('/car-search').get(SearchController.Search);

module.exports = Router;
