'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var ATTR_REGEXP = /\s*(?:[a-z]+)\s*:\s*(?:.(?![a-z]*\s*:))*/gi;
var QUERY_REGEXP = /^((?:(?:[^\s:]+(?![a-z]*\s*:))\s*)*)/i;

exports['default'] = function (queryString) {
	var query = queryString.match(QUERY_REGEXP)[0].trim();
	var substr = queryString.substr(query.length);
	var filters = [];
	var match = undefined;

	while ((match = ATTR_REGEXP.exec(substr)) !== null) {
		var temp = match[0].split(':');
		filters.push(temp[0].trim() + ':' + temp[1].trim());
	}

	return {
		query: query,
		facetFilters: filters.join(',')
	};
};

module.exports = exports['default'];
//# sourceMappingURL=parse-query.js.map
