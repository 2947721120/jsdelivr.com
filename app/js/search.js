'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _algoliasearch = require('algoliasearch');

var _algoliasearch2 = _interopRequireDefault(_algoliasearch);

var _configAlgolia = require('../config/algolia');

var _configAlgolia2 = _interopRequireDefault(_configAlgolia);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var appLog = (0, _logger2['default'])('app');
var client = (0, _algoliasearch2['default'])(_configAlgolia2['default'].appID, _configAlgolia2['default'].readAccessToken);
var jsDelivrIndex = client.initIndex('jsDelivr');
var jsDelivrAssetsIndex = client.initIndex('jsDelivr_assets');
var noQuery = [];

/**
 * Create an in-memory copy of the index and update in once an hour.
 */
var db = {};

exports.db = db;
updateInMemoryIndex();
setInterval(updateInMemoryIndex, 3600000);

exports['default'] = function (queryString, page) {
	return _bluebird2['default']['try'](function () {
		var parsed = parseQuery(queryString);
		var options = { page: page || 0 };

		if (parsed.facetFilters) {
			options.facetFilters = parsed.facetFilters;
		}

		if (!parsed.query) {
			if (!parsed.facetFilters.length) {
				// No query, no filters. We can just show the first 10 projects.
				return noQuery;
			} else {
				// Facet filters. No need to query Algolia for these.
				return _lodash2['default'].filter(db, function (project) {
					for (var i = 0; i < parsed.facetFilters.length; i++) {
						if (project[parsed.facetFilters[i][0]] !== parsed.facetFilters[i][1]) {
							return false;
						}
					}

					return true;
				});
			}
		}

		// We'll need to query Algolia.
		var facetFilters = [];

		_lodash2['default'].each(options.facetFilters, function (filter) {
			facetFilters.push(filter[0] + ':' + filter[1]);
		});

		options.facetFilters = facetFilters.join(',');

		return jsDelivrIndex.search(parsed.query, options).then(function (response) {
			_lodash2['default'].each(response.hits, function (project) {
				project.selectedVersion = project.lastversion;

				if (!project.assets.length) {
					project.assets = db[project.name].assets;
				}
			});

			return response.hits;
		});
	});
};

var ATTR_REGEXP = /\s*(?:[a-z]+)\s*:\s*(?:.(?![a-z]*\s*:))*/gi;
var QUERY_REGEXP = /^((?:(?:[^\s:]+(?![a-z]*\s*:))\s*)*)/i;

function parseQuery(queryString) {
	var query = queryString.match(QUERY_REGEXP)[0].trim();
	var substr = queryString.substr(query.length);
	var filters = [];
	var match = undefined;

	while ((match = ATTR_REGEXP.exec(substr)) !== null) {
		var temp = match[0].split(':');
		filters.push([temp[0].trim(), temp[1].trim()]);
	}

	return {
		query: query,
		facetFilters: filters
	};
}

function updateInMemoryIndex() {
	var index = {};
	noQuery = [];

	getAllProjects().then(function (projects) {
		_lodash2['default'].each(projects, function (project) {
			index[project.name] = project;
			project.selectedVersion = project.lastversion;

			if (!project.assets.length) {
				jsDelivrAssetsIndex.search('', { hitsPerPage: 100, facetFilters: 'name:' + project.name }).then(function (response) {
					project.assets = response.hits;
				})['catch'](function (error) {
					appLog.err(error);
				});
			}
		});

		_lodash2['default'].each(Object.keys(index).slice(0, 10), function (name) {
			noQuery.push(index[name]);
		});

		_lodash2['default'].forEach(index, function (value, key) {
			db[key] = value;
		});

		appLog.info('In-memory copy of the index successfully updated.');
	})['catch'](function (error) {
		appLog.err(error);
	});
}

function getAllProjects() {
	var page = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

	// Can't get more than 1000 projects at once.
	var hitsPerPage = 1000;

	return jsDelivrIndex.browse('', { page: page, hitsPerPage: hitsPerPage }).then(function (response) {
		if (response.nbHits > hitsPerPage * (page + 1)) {
			return getAllProjects(page + 1).then(function (response2) {
				var _response$hits;

				return (_response$hits = response.hits).concat.apply(_response$hits, _toConsumableArray(response2));
			});
		}

		return response.hits;
	});
}
//# sourceMappingURL=search.js.map
