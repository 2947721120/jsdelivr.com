"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports["default"] = function (collection, project) {
	var version = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	var file = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

	for (var i = 0; i < collection.length; i++) {
		if (collection[i].project === project && (!version || collection[i].version === version) && (!file || collection[i].name === file)) {
			return i;
		}
	}

	return -1;
};

module.exports = exports["default"];
//# sourceMappingURL=get-collection-index.js.map
