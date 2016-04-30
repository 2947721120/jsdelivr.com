'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var CSS_PATTERN = /\.css$/i;
var JS_PATTERN = /\.js$/i;
var CDN_ROOT = '//cdn.jsdelivr.net';

exports['default'] = function (collection) {
	var groupLinks = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	var links = { js: [], css: [], other: [] };

	collection.forEach(function (file) {
		var link = CDN_ROOT + '/' + file.project + '/' + file.version + '/' + file.name;

		if (CSS_PATTERN.test(file.name)) {
			links.css.push(link);
		} else if (JS_PATTERN.test(file.name)) {
			links.js.push(link);
		} else {
			links.other.push(link);
		}
	});

	if (!groupLinks) {
		return links;
	}

	return {
		js: buildLink(collection, JS_PATTERN, links.js.length > 1),
		css: buildLink(collection, CSS_PATTERN, links.css.length > 1),
		other: links.other
	};
};

function buildLink(collection, filter, merge) {
	var chunks = [];
	var filtered = collection.filter(function (file) {
		return filter.test(file.name);
	});

	// There is ony one file of this type; don't merge.
	if (!merge && filtered.length) {
		return [CDN_ROOT + '/' + filtered[0].project + '/' + filtered[0].version + '/' + filtered[0].name];
	}

	groupByProject(filtered).forEach(function (project) {
		if (project.files.length) {
			var link = project.name + '@' + project.version;

			// No need to create a list of files if there is only the main file.
			if (project.files.length !== 1 || project.files[0] !== project.mainfile) {
				link += '(' + project.files.join('+') + ')';
			}

			chunks.push(link);
		}
	});

	return chunks.length ? [CDN_ROOT + '/g/' + chunks.join(',')] : [];
}

function groupByProject(collection) {
	var projects = {};

	collection.forEach(function (file) {
		var key = file.project + file.version;

		if (!projects[key]) {
			projects[key] = {
				name: file.project,
				version: file.version,
				mainfile: file.mainfile,
				files: [file.name]
			};
		} else {
			projects[key].files.push(file.name);
		}
	});

	return Object.keys(projects).map(function (key) {
		return projects[key];
	});
}
module.exports = exports['default'];
//# sourceMappingURL=build-links.js.map
