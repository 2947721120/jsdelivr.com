'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _pngquantBin = require('pngquant-bin');

var _pngquantBin2 = _interopRequireDefault(_pngquantBin);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _phantom = require('phantom');

var _phantom2 = _interopRequireDefault(_phantom);

exports['default'] = function (countries) {
	return new _bluebird2['default'](function (resolve) {
		_phantom2['default'].create(function (ph) {
			ph.createPage(function (page) {
				var images = [];

				page.set('onCallback', function (image) {
					images.push(image);

					if (images.length === countries.length) {
						ph.exit();

						images.reduce(function (promise, image, index) {
							return promise.then(function () {
								return new _bluebird2['default'](function (resolve, reject) {
									_child_process2['default'].execFile(_pngquantBin2['default'], ['-'], { encoding: 'buffer' }, function (error, stdout, stderr) {
										if (error || stderr.length) {
											return reject(error || stderr.toString());
										}

										images[index] = stdout;
										resolve();
									}).stdin.write(image.replace(/^data:image\/png;base64,/, ''), 'base64');
								});
							});
						}, _bluebird2['default'].resolve()).then(function () {
							resolve(images);
						});
					}
				});

				page.set('content', '\n\t\t\t\t\t<html>\n\t\t\t\t\t\t<head>\n\t\t\t\t\t\t\t<script src="https://www.google.com/jsapi"></script>\n\t\t\t\t\t\t\t<script>\n\t\t\t\t\t\t\t\tgoogle.load(\'visualization\', \'1.1\', {\n\t\t\t\t\t\t\t\t\tpackages: [ \'corechart\', \'geochart\' ],\n\t\t\t\t\t\t\t\t\tlanguage: \'en\',\n\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\tgoogle.setOnLoadCallback(function () {\n\t\t\t\t\t\t\t\t\tvar countries = ' + JSON.stringify(countries) + ';\n\n\t\t\t\t\t\t\t\t\tcountries.forEach(function (country) {\n\t\t\t\t\t\t\t\t\t\tcountry.forEach(function (entry) {\n\t\t\t\t\t\t\t\t\t\t\tentry[0] = new Date(entry[0] * 1000)\n\t\t\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\tcountries.forEach(function (country) {\n\t\t\t\t\t\t\t\t\t\tvar tooltipData = new google.visualization.DataTable();\n\t\t\t\t\t\t\t\t\t\tvar tooltipChart = new google.visualization.LineChart(document.getElementById(\'chart\'));\n\n\t\t\t\t\t\t\t\t\t\ttooltipData.addColumn(\'date\', \'Date\');\n\t\t\t\t\t\t\t\t\t\ttooltipData.addColumn(\'number\', \'Hits\');\n\t\t\t\t\t\t\t\t\t\ttooltipData.addRows(country);\n\n\t\t\t\t\t\t\t\t\t\tgoogle.visualization.events.addListener(tooltipChart, \'ready\', function () {\n\t\t\t\t\t\t\t\t\t\t\twindow.callPhantom(tooltipChart.getImageURI());\n\t\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\t\ttooltipChart.draw(tooltipData, {\n\t\t\t\t\t\t\t\t\t\t\tchartArea: {\n\t\t\t\t\t\t\t\t\t\t\t\tleft: 35,\n\t\t\t\t\t\t\t\t\t\t\t\ttop: 10,\n\t\t\t\t\t\t\t\t\t\t\t\theight: 100,\n\t\t\t\t\t\t\t\t\t\t\t\twidth: 270,\n\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\tbackgroundColor: {\n\t\t\t\t\t\t\t\t\t\t\t\tfill: \'transparent\',\n\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\twidth: 320,\n\t\t\t\t\t\t\t\t\t\t\theight: 130,\n\t\t\t\t\t\t\t\t\t\t\tcurveType: \'function\',\n\t\t\t\t\t\t\t\t\t\t\tfontSize: 13,\n\t\t\t\t\t\t\t\t\t\t\tlegend: \'none\',\n\t\t\t\t\t\t\t\t\t\t\tvAxis: {\n\t\t\t\t\t\t\t\t\t\t\t\tformat: \'short\',\n\t\t\t\t\t\t\t\t\t\t\t\tgridlines: {\n\t\t\t\t\t\t\t\t\t\t\t\t\tcolor: \'#363f49\',\n\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\ttextStyle: {\n\t\t\t\t\t\t\t\t\t\t\t\t\tcolor: \'#fff\',\n\t\t\t\t\t\t\t\t\t\t\t\t\tfontSize: 10,\n\t\t\t\t\t\t\t\t\t\t\t\t\tbold: false,\n\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\thAxis: {\n\t\t\t\t\t\t\t\t\t\t\t\tformat: \'MMM d\',\n\t\t\t\t\t\t\t\t\t\t\t\tgridlines: {\n\t\t\t\t\t\t\t\t\t\t\t\t\tcolor: \'#363f49\',\n\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\ttextStyle: {\n\t\t\t\t\t\t\t\t\t\t\t\t\tcolor: \'#fff\',\n\t\t\t\t\t\t\t\t\t\t\t\t\tfontSize: 10,\n\t\t\t\t\t\t\t\t\t\t\t\t\tbold: false,\n\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t</script>\n\t\t\t\t\t\t</head>\n\n\t\t\t\t\t\t<body>\n\t\t\t\t\t\t\t<div id="chart"></div>\n\t\t\t\t\t\t</body>\n\t\t\t\t\t</html>');
			});
		});
	});
};

module.exports = exports['default'];
//# sourceMappingURL=render.js.map
