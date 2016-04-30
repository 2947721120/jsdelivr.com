'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _search = require('./search');

exports['default'] = function (req, res) {
	res.set('Content-Type', 'application/xml');
	res.render('sitemap.xml', {
		projects: _search.db,
		helpers: {
			format: function format(date) {
				return new Date(date).toISOString();
			}
		}
	});
};

module.exports = exports['default'];
//# sourceMappingURL=sitemap.js.map
