'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _algoliasearch = require('algoliasearch');

var _algoliasearch2 = _interopRequireDefault(_algoliasearch);

var _search = require('./search');

var _configAlgolia = require('../config/algolia');

var _configAlgolia2 = _interopRequireDefault(_configAlgolia);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var appLog = (0, _logger2['default'])('app');
var client = (0, _algoliasearch2['default'])(_configAlgolia2['default'].appID, _configAlgolia2['default'].writeAccessToken);
var jsDelivrIndex = client.initIndex('jsDelivr');
var jsDelivrAssetsIndex = client.initIndex('jsDelivr_assets');

setInterval(updateIndex, 60000);

function updateIndex() {
	(0, _requestPromise2['default'])('https://api.jsdelivr.com/v1/jsdelivr/libraries').then(function (body) {
		return JSON.parse(body);
	}).then(function (data) {
		_lodash2['default'].forEach(data, function (project) {
			var aProject = _search.db[project.name];

			if (!aProject || project.versions.length > aProject.versions.length) {
				project = _lodash2['default'].pick(project, ['name', 'mainfile', 'lastversion', 'description', 'homepage', 'github', 'author', 'versions', 'assets']);
				project.objectID = project.name;
				project.lastupdate = Date.now();

				appLog.info('Updating project ' + project.name + '.');
				_search.db[project.name] = _lodash2['default'].merge({}, project);

				// Save each version as a separate record for big projects.
				if (JSON.stringify(project).length > 100000) {
					(function () {
						var assets = [];
						appLog.info('Project ' + project.name + ' is too big. Each version will be stored as a separate record.');

						_lodash2['default'].forEach(project.assets, function (entry) {
							assets.push({
								objectID: project.objectID + '-' + entry.version,
								name: project.name,
								version: entry.version,
								files: entry.files
							});

							// Still too big?
							if (JSON.stringify(assets[assets.length - 1]).length > 100000) {
								appLog.notice('Project ' + project.name + ' v' + entry.version + ' is too big. Only main file will be included.');
								assets[assets.length - 1].files = [project.mainfile];
							}
						});

						jsDelivrAssetsIndex.saveObjects(assets)['catch'](function (error) {
							appLog.err('Couldn\'t update project ' + project.name + ' (jsDelivr_assets): ' + error);
						});

						project.assets = [];
					})();
				}

				jsDelivrIndex.saveObject(project)['catch'](function (error) {
					appLog.err('Couldn\'t update project ' + project.name + ' (jsDelivr): ' + error);
				});
			}
		});
	});
}
//# sourceMappingURL=update.js.map
