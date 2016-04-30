'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _le_node = require('le_node');

var _le_node2 = _interopRequireDefault(_le_node);

var _configLogentries = require('../config/logentries');

var _configLogentries2 = _interopRequireDefault(_configLogentries);

exports['default'] = function (name) {
	var logger = new _le_node2['default'](_configLogentries2['default'][name]);

	logger.on('error', function (error) {
		console.error(error);
	});

	return logger;
};

module.exports = exports['default'];
//# sourceMappingURL=logger.js.map
