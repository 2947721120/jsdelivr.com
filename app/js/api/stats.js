'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _statsRender = require('./stats/render');

var _statsRender2 = _interopRequireDefault(_statsRender);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var appLog = (0, _logger2['default'])('app');
var statsCache = JSON.stringify({
	cedexis: {
		decisions: [],
		perfmap: [],
		map: []
	},
	dns: {
		chart: []
	},
	cdn: {
		total: {}
	}
});

updateData();
setInterval(updateData, 3600000);

exports['default'] = function (req, res) {
	res.set('Content-Type', 'application/json');
	res.send(statsCache);
};

function updateData() {
	appLog.info('Updating stats.');

	(0, _requestPromise2['default'])('http://dev.dakulov.com/jsdelivr/stats.php').then(function (body) {
		appLog.debug('Got the following stats:');
		appLog.debug(body);

		var data = JSON.parse(body);
		var result = JSON.parse(statsCache); // Use previous data if something's missing.

		if (!_lodash2['default'].isEmpty(data.dns.chart)) {
			// 1. Group by date.
			// 2. Convert to arrays of [ date, hits ].
			// 3. Remove today's (incomplete) stats.
			result.dns.chart = _lodash2['default'].map(_lodash2['default'].groupBy(data.dns.chart, function (entry) {
				var date = new Date(entry[0] * 1000);
				return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
			}), function (day) {
				return [day[0][0], _lodash2['default'].sum(day, function (entry) {
					return entry[1];
				})];
			}).slice(0, -1);
		}

		if (!_lodash2['default'].isEmpty(data.cedexis.decisions)) {
			// 1. Group by date.
			// 2. Convert to arrays of [ date, MaxCDN, CloudFlare, KeyCDN, Quantil ].
			result.cedexis.decisions = _lodash2['default'].map(_lodash2['default'].groupBy(data.cedexis.decisions, 1), function (decisions, date) {
				return [Number(date), _lodash2['default'].find(decisions, function (decision) {
					return decision[0] === 'MaxCDN';
				})[2], _lodash2['default'].find(decisions, function (decision) {
					return decision[0] === 'CloudFlare';
				})[2], _lodash2['default'].find(decisions, function (decision) {
					return decision[0] === 'KeyCDN';
				})[2], _lodash2['default'].get(_lodash2['default'].find(decisions, function (decision) {
					return decision[0] === 'quantil';
				}), 2, null)];
			});
		}

		if (!_lodash2['default'].isEmpty(data.cedexis.map)) {
			// 1. Generate the charts and save them as images.
			// 2. Use base64 encoding and include the images in the stats.
			(0, _statsRender2['default'])(_lodash2['default'].map(_lodash2['default'].groupBy(data.cedexis.map, 0), function (countryData) {
				return _lodash2['default'].map(countryData, function (entry) {
					return [entry[1], entry[2]];
				}).sort(function (a, b) {
					return a[0] - b[0];
				});
			})).then(function (images) {
				_lodash2['default'].forEach(images, function (image, index) {
					result.cedexis.map[index][2] = image.toString('base64');
				});

				statsCache = JSON.stringify(result);
				appLog.info('Chart images generated.');
			})['catch'](function (error) {
				appLog.err(error);
			});

			// 1. Group by country.
			// 2. Reformat country names (Congo, The Democratic Republic of the -> The Democratic Republic of the Congo).
			// 3. Sum hits per country.
			result.cedexis.map = _lodash2['default'].map(_lodash2['default'].groupBy(data.cedexis.map, 0), function (data, country) {
				return [friendlyCountryName(country), _lodash2['default'].sum(data, function (entry) {
					return entry[2];
				})];
			});
		}

		// 1. Group by country.
		// 2. Reformat country names.
		// 3. Get median of the values.
		if (!_lodash2['default'].isEmpty(data.cedexis.perfmap)) {
			result.cedexis.perfmap = _lodash2['default'].map(_lodash2['default'].groupBy(data.cedexis.perfmap, 0), function (data, country) {
				return [friendlyCountryName(country), Math.round(median(_lodash2['default'].map(data, function (entry) {
					return entry[2];
				})))];
			});
		}

		result.cedexis.total = data.cedexis.total || result.cedexis.total;
		result.cdn.total.hits = data.cdn.total.hits || result.cdn.total.hits;
		result.cdn.total.traffic = data.cdn.total.traffic || result.cdn.total.traffic;
		result.dns.total = data.dns.total || result.dns.total;
		result.lastUpdate = Date.now();
		statsCache = JSON.stringify(result);

		appLog.info('Stats successfully updated.');
		appLog.debug(_lodash2['default'].clone(result, true));
	})['catch'](function (error) {
		appLog.err(error);
	});
}

function friendlyCountryName(name) {
	var index = name.indexOf(',');

	return ~index ? name.substring(index + 2) + ' ' + name.substring(0, index) : name;
}

function median(values) {
	values = values.slice().sort(function (a, b) {
		return a - b;
	});

	return values.length % 2 ? values[(values.length - 1) / 2] : (values[values.length / 2] + values[values.length / 2 - 1]) / 2;
}
module.exports = exports['default'];
//# sourceMappingURL=stats.js.map
