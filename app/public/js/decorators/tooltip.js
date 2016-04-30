'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

exports['default'] = function (node, title) {
	var placement = arguments.length <= 2 || arguments[2] === undefined ? 'top' : arguments[2];
	var trigger = arguments.length <= 3 || arguments[3] === undefined ? 'hover' : arguments[3];
	var container = arguments.length <= 4 || arguments[4] === undefined ? 'body' : arguments[4];

	var $node = $(node).tooltip({
		title: title,
		placement: placement,
		trigger: trigger,
		container: container
	});

	return {
		teardown: function teardown() {
			$node.tooltip('destroy');
		}
	};
};

module.exports = exports['default'];
//# sourceMappingURL=tooltip.js.map
