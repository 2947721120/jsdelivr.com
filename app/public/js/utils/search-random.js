'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _countProjectsJs = require('./count-projects.js');

var _countProjectsJs2 = _interopRequireDefault(_countProjectsJs);

var _searchJs = require('./search.js');

var _searchJs2 = _interopRequireDefault(_searchJs);

var _hasJs = require('./has.js');

var _hasJs2 = _interopRequireDefault(_hasJs);

exports['default'] = function () {
	return (0, _countProjectsJs2['default'])().then(function (nbProjects) {
		var hasLocalStorage = _hasJs2['default'].localStorage();
		var now = Date.now();

		if (hasLocalStorage && localStorage.getItem('randomProjectsExpires') >= now) {
			return JSON.parse(localStorage.getItem('randomProjects'));
		}

		return (0, _searchJs2['default'])('', Math.floor(Math.random() * nbProjects / 10)).then(function (result) {
			if (hasLocalStorage) {
				localStorage.setItem('randomProjects', JSON.stringify(result.response));
				localStorage.setItem('randomProjectsExpires', now + 604800000); // Cache for one week.
			}

			return result.response;
		});
	});
};

module.exports = exports['default'];
//# sourceMappingURL=search-random.js.map
