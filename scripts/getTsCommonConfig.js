'use strict';

const fs = require('fs');
const assign = require('object-assign');
const { getProjectPath } = require('./utils');

module.exports = function () {
	let mine = {};
	if (fs.existsSync(getProjectPath('tsconfig.json'))) {
		mine = require(getProjectPath('tsconfig.json'));
	}

	return assign({
		noUnusedParameters: true,
		noUnusedLocals: true,
		strictNullChecks: true,
		target: 'es6',
		jsx: 'preserve',
		moduleResolution: 'node',
		declaration: true,
		allowSyntheticDefaultImports: true,
		},
		mine.compilerOptions
	);
}
