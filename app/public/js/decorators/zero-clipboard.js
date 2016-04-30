'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

exports['default'] = function (node) {
	var tooltipPlacement = arguments.length <= 1 || arguments[1] === undefined ? 'top' : arguments[1];

	var clip = new ZeroClipboard(node);
	var $node = $(node);
	var tooltipOptions = {
		title: 'Copy to Clipboard',
		placement: tooltipPlacement,
		trigger: 'hover',
		container: 'body',
		animation: false
	};

	$node.on('mouseover', function () {
		$node.tooltip('destroy').tooltip(tooltipOptions).tooltip('show');
	});

	clip.on('aftercopy', function () {
		$node.tooltip('destroy').tooltip($.extend({}, tooltipOptions, { title: 'Copied!' })).tooltip('show');
	});

	return {
		teardown: function teardown() {}
	};
};

module.exports = exports['default'];
//# sourceMappingURL=zero-clipboard.js.map
