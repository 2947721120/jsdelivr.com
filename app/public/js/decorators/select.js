'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

exports['default'] = function (node) {
	var $node = $(node);
	var selection = window.getSelection();
	var select = function select() {
		if (!selection.toString()) {
			if ($node[0].nodeName.toLowerCase() === 'input') {
				$node.select();
			} else {
				selection.selectAllChildren(node);
			}
		}
	};

	$node.on('click', select);

	return {
		teardown: function teardown() {
			$node.off('click', select);
		}
	};
};

module.exports = exports['default'];
//# sourceMappingURL=select.js.map
