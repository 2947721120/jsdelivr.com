'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _nativeDns = require('native-dns');

var _nativeDns2 = _interopRequireDefault(_nativeDns);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var appLog = (0, _logger2['default'])('app');
var server = { address: '127.0.0.1:51792/www.jsdelivr.com/src/' };

_nativeDns2['default'].lookup(server.address, function (error, address) {
	if (error) {
		throw error;
	}

	server.address = address;
	appLog.info('DNS server address: ' + address + '.');
});

exports['default'] = function (req, res) {
	if (!req.query.domain) {
		return res.sendStatus(400);
	}

	var request = _nativeDns2['default'].Request({
		question: _nativeDns2['default'].Question({
			name: req.query.domain,
			type: 'A'
		}),
		server: server
	});

	request.on('timeout', function () {
		res.sendStatus(540);
	});

	request.on('message', function (error, response) {
		if (error || !response.answer.length) {
			return res.sendStatus(500);
		}

		res.send(response.answer[0].data);
	});

	request.send();
};

module.exports = exports['default'];
//# sourceMappingURL=dns.js.map
