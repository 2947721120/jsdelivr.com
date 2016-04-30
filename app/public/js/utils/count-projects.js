'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _algolia = require('./algolia');

var _algolia2 = _interopRequireDefault(_algolia);

var _has = require('./has');

var _has2 = _interopRequireDefault(_has);

var jsDelivrIndex = _algolia2['default'].initIndex('jsDelivr');

exports['default'] = function () {
	return Promise.resolve().then(function () {
		var hasLocalStorage = _has2['default'].localStorage();
		var now = Date.now();

		if (hasLocalStorage && localStorage.getItem('nbProjectsExpires') >= now) {
			return localStorage.getItem('nbProjects');
		}

		return jsDelivrIndex.search('', { analytics: false }).then(function (response) {
			var nbProjects = Math.floor(response.nbHits / 50) * 50;

			if (hasLocalStorage) {
				localStorage.setItem('nbProjects', nbProjects);
				localStorage.setItem('nbProjectsExpires', now + 604800000); // Cache for one week.
			}

			return nbProjects;
		});
	});
};

module.exports = exports['default'];
//# sourceMappingURL=count-projects.js.map
