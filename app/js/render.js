'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _search = require('./search');

var _search2 = _interopRequireDefault(_search);

var appLog = (0, _logger2['default'])('app');
var PROJECTS_PATTERN = /^\/projects\/([^/]+)\/?$/i;

exports['default'] = function (req, res) {
	var path = req.path;
	var renderOptions = { wrapper: 'app.html', el: 'page', data: {} };
	var renderCallback = function renderCallback(error, html) {
		if (error) {
			// Don't log "Failed to lookup view" errors.
			if (!error.message || error.message.indexOf('Failed to lookup view') === -1) {
				appLog.err(error);
			}

			return res.sendStatus(404);
		}

		res.send(html);
	};

	if (path === '/') {
		return (0, _search2['default'])(req.query.query || '', req.query.page).then(function (projects) {
			renderOptions.data.projects = projects;
			res.render('components/index.html', renderOptions, renderCallback);
		})['catch'](function (error) {
			appLog.err(error);
			res.sendStatus(500);
		});
	}

	if (PROJECTS_PATTERN.test(path)) {
		return (0, _search2['default'])('name: ' + PROJECTS_PATTERN.exec(path)[1], 0).then(function (projects) {
			renderOptions.data.project = projects[0];
			renderOptions.data.name = projects[0].name;
			res.render('components/projects.html', renderOptions, renderCallback);
		})['catch'](function (error) {
			appLog.err(error);
			res.sendStatus(500);
		});
	}

	res.render('components' + path + '.html', renderOptions, renderCallback);
};

module.exports = exports['default'];
//# sourceMappingURL=render.js.map
