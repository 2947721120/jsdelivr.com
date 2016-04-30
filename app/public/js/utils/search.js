'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _algoliaJs = require('./algolia.js');

var _algoliaJs2 = _interopRequireDefault(_algoliaJs);

var _parseQueryJs = require('./parse-query.js');

var _parseQueryJs2 = _interopRequireDefault(_parseQueryJs);

var jsDelivrIndex = _algoliaJs2['default'].initIndex('jsDelivr');

exports['default'] = function (queryString) {
	var page = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	var hitsPerPage = arguments.length <= 2 || arguments[2] === undefined ? 10 : arguments[2];

	return Promise.resolve().then(function () {
		var parsed = (0, _parseQueryJs2['default'])(queryString);
		var options = { page: page, hitsPerPage: hitsPerPage };
		var promise = undefined;

		if (parsed.facetFilters) {
			options.facetFilters = parsed.facetFilters;
		}

		if (parsed.query || options.facetFilters) {
			promise = jsDelivrIndex.search(parsed.query, options);
		} else {
			promise = jsDelivrIndex.browse(options.page, hitsPerPage);
		}

		return promise.then(function (response) {
			var load = [];

			response.hits.forEach(function (project) {
				project.selectedVersion = project.lastversion;

				if (!project.assets.length) {
					load.push(project);
				}
			});

			if (!load.length) {
				return {
					response: $.extend(true, {}, response),
					queryString: queryString
				};
			}

			_algoliaJs2['default'].startQueriesBatch();

			load.forEach(function (project) {
				_algoliaJs2['default'].addQueryInBatch('jsDelivr_assets', '', {
					hitsPerPage: 100,
					facetFilters: 'name: ' + project.name
				});
			});

			return _algoliaJs2['default'].sendQueriesBatch().then(function (content) {
				load.forEach(function (project, index) {
					project.assets = content.results[index].hits;
				});

				return {
					response: $.extend(true, {}, response),
					queryString: queryString
				};
			});
		});
	});
};

module.exports = exports['default'];
//# sourceMappingURL=search.js.map
