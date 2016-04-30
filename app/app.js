'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _isBot = require('is-bot');

var _isBot2 = _interopRequireDefault(_isBot);

var _ractive = require('ractive');

var _ractive2 = _interopRequireDefault(_ractive);

var _ractiveLoad = require('ractive-load');

var _ractiveLoad2 = _interopRequireDefault(_ractiveLoad);

var _ractiveRender = require('ractive-render');

var _ractiveRender2 = _interopRequireDefault(_ractiveRender);

var _expressHandlebars = require('express-handlebars');

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _configMorgan = require('./config/morgan');

var _configMorgan2 = _interopRequireDefault(_configMorgan);

var _jsApiDns = require('./js/api/dns');

var _jsApiDns2 = _interopRequireDefault(_jsApiDns);

var _jsApiMail = require('./js/api/mail');

var _jsApiMail2 = _interopRequireDefault(_jsApiMail);

var _jsApiStats = require('./js/api/stats');

var _jsApiStats2 = _interopRequireDefault(_jsApiStats);

var _jsLogger = require('./js/logger');

var _jsLogger2 = _interopRequireDefault(_jsLogger);

var _jsRender = require('./js/render');

var _jsRender2 = _interopRequireDefault(_jsRender);

var _jsSitemap = require('./js/sitemap');

var _jsSitemap2 = _interopRequireDefault(_jsSitemap);

require('./js/update');

var appLog = (0, _jsLogger2['default'])('app');
var app = (0, _express2['default'])();

/**
 * Express config.
 */
app.use((0, _serveFavicon2['default'])(__dirname + '/public/img/favicon.ico'));
app.use((0, _morgan2['default'])(_configMorgan2['default'].format, _configMorgan2['default'].options));
app.use((0, _compression2['default'])());
app.use(_express2['default']['static'](__dirname + '/public', { maxAge: 3600000 }));
app.use(_bodyParser2['default'].json());

app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.set('x-powered-by', false);

app.engine('html', _ractiveRender2['default'].renderFile);
app.engine('xml', (0, _expressHandlebars2['default'])());

/**
 * ractive-render config.
 */
_ractiveRender2['default'].use('load').config({ componentsLoader: 'load', defaultLoader: 'load' });
_ractiveLoad2['default'].baseUrl = __dirname;

// Tell our components not to use browser specific stuff.
_ractive2['default'].isServer = true;
_ractive2['default'].DEBUG = false;

/**
 * Private APIs used by our frontend.
 */
app.all('/api/dns', _jsApiDns2['default']);
app.all('/api/mail', _jsApiMail2['default']);
app.all('/api/stats', _jsApiStats2['default']);

/**
 * sitemap.xml
 */
app.all('/sitemap.xml', _jsSitemap2['default']);

/**
 * Make caching work correctly, as we'll be sending rendered pages for bots.
 */
app.use(function (req, res, next) {
	res.vary('User-Agent');
	next();
});

/**
 * Redirect from old urls.
 */
app.use(function (req, res, next) {
	if (!req.query._escaped_fragment_) {
		return next();
	}

	res.redirect(301, '/projects/' + req.query._escaped_fragment_.replace(/\r|\n/g, ''));
});

/**
 * Render on server side if it's a bot.
 */
app.use(function (req, res, next) {
	if (!(0, _isBot2['default'])(req.headers['user-agent'])) {
		return next();
	}

	(0, _jsRender2['default'])(req, res);
});

/**
 * Just send a template and render on client side.
 */
app.all('/*', function (req, res) {
	res.sendFile(__dirname + '/views/app.html');
});

app.listen(process.env.PORT || 4400, function () {
	appLog.info('Express server listening on port ' + this.address().port + '.');
});

process.on('uncaughtException', function (error) {
	console.error('CRITICAL ERROR (exiting in 10 seconds):', error, error.stack);
	appLog.crit(error);

	setTimeout(function () {
		process.exit(1);
	}, 10000);
});
//# sourceMappingURL=app.js.map
