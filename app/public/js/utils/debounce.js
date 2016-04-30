"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports["default"] = function (fn) {
	var wait = arguments.length <= 1 || arguments[1] === undefined ? 100 : arguments[1];

	var timeout = undefined;

	return function () {
		clearTimeout(timeout);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		timeout = setTimeout.apply(undefined, [fn, wait].concat(args));
	};
};

module.exports = exports["default"];
//# sourceMappingURL=debounce.js.map
