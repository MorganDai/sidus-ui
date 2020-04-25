const path = require('path');
const cwd = process.cwd();

// We convert less import in es/lib to css file path
function cssInjection(content) {
	return content
		.replace(/\/style\/?'/g, "/style/css'")
		.replace(/\/style\/?"/g, '/style/css"')
		.replace(/\.less/g, '.css');
}

module.exports = {
	cssInjection,
};

function getProjectPath(...filePath) {
	return path.join(cwd, ...filePath);
}

function resolve(moduleName) {
	return require.resolve(moduleName);
}

function getConfig() {
	const configPath = getProjectPath('.antd-tools.config.js');
	if (fs.existsSync(configPath)) {
		return require(configPath);
	}

	return {};
}

module.exports = {
	getProjectPath,
	resolve,
	getConfig,
	cssInjection
};