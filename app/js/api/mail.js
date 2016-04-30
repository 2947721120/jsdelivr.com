'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var appLog = (0, _logger2['default'])('app');
var config = Object.create(null);

config['custom-cdn'] = {
	email: 'contact@jsdelivr.com',
	subject: 'Custom CDN Hosting'
};

config['consultation-services'] = {
	email: 'dakulovgr@gmail.com',
	subject: 'jsDelivr: Consultation services'
};

exports['default'] = function (req, res) {
	if (!(req.body.page in config) || !req.body.name || !req.body.email || !req.body.message || !/^[^@]+@[^@]+\.[^@]+$/.test(req.body.email)) {
		return res.sendStatus(400);
	}

	var transporter = _nodemailer2['default'].createTransport();

	transporter.sendMail({
		from: req.body.email,
		to: config[req.body.page].email,
		subject: config[req.body.page].subject,
		text: 'Name:\n' + req.body.name + '\n\nMessage:\n' + req.body.message
	}, function (error) {
		var email = JSON.stringify({ name: req.body.name, email: req.body.email, message: req.body.message });

		if (error) {
			appLog.err('Failed to send email: ' + email);
			appLog.err(error);
			return res.send(500);
		}

		appLog.info('Sent email: ' + email);
		return res.send(200);
	});
};

module.exports = exports['default'];
//# sourceMappingURL=mail.js.map
