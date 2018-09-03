const Router = require('express').Router();
const Search = require('./search.controller');

Router.route('/search').get(Search.defaultSearch);

module.exports = Router;
