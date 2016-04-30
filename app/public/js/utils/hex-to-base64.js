"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports["default"] = function (string) {
	return btoa(String.fromCharCode.apply(null, string.match(/([\da-fA-F]{2})/g).map(function (charCode) {
		return parseInt(charCode, 16);
	})));
};

module.exports = exports["default"];
//# sourceMappingURL=hex-to-base64.js.map
