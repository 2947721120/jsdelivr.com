'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _jsLogger = require('../js/logger');

var _jsLogger2 = _interopRequireDefault(_jsLogger);

var accessLog = (0, _jsLogger2['default'])('access');

exports['default'] = {
	format: 'remoteAddr: :remote-addr; date: :date; method: :method; url: :url: httpVersion: :http-version; status: :status;' + 'contentLength: :res[content-length]; referrer: :referrer; userAgent: :user-agent; responseTime: :response-time ms',
	options: {
		stream: {
			write: function write(message) {
				accessLog.info(message.trim());
			}
		}
	}
};
module.exports = exports['default'];
//# sourceMappingURL=morgan.js.map
