const fs = require('fs');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));
const babel = require('gulp-babel');
const through2 = require('through2');
const merge2 = require('merge2')
const rimraf = require('rimraf');
const stripCode = require('gulp-strip-code');
const gulp = require('gulp');
const ts = require('gulp-typescript');
const sass = require('gulp-sass');
const webpack = require('webpack');

const { getProjectPath, getConfig, cssInjection } = require('./scripts/utils');
const getBabelCommonConfig = require('./scripts/getBabelCommonConfig');
const tsConfig = require('./scripts/getTsCommonConfig')();

const tsDefaultReporter = ts.reporter.defaultReporter();
const replaceLib = require('./scripts/replaceLib')
const libDir = getProjectPath('lib');
const esDir = getProjectPath('es');

function babelify(js, modules) {
	const babelConfig = getBabelCommonConfig(modules);
	delete babelConfig.cacheDirectory;

	if (modules === false) {
		babelConfig.plugins.push(replaceLib);
	}

	let stream = js.pipe(babel(babelConfig)).pipe(
		through2.obj(function z(file, encoding, next) {
			this.push(file.clone());
			if (file.path.match(/(\/|\\)style(\/|\\)index\.js/)) {
				const content = file.contents.toString(encoding);
				if (content.indexOf("'react-native'") !== -1) {
					// actually in antd-mobile@2.0, this case will never run,
					// since we both split style/index.mative.js style/index.js
					// but let us keep this check at here
					// in case some of our developer made a file name mistake ==
					next();
					return;
				}

				file.contents = Buffer.from(cssInjection(content));
				file.path = file.path.replace(/index\.js/, 'css.js');
				this.push(file);
				next();
			} else {
				next();
			}
		})
	);

	if (modules === false) {
		stream = stream.pipe(
			stripCode({
				start_comment: '@remove-on-es-build-begin',
				end_comment: '@remove-on-es-build-end'
			})
		)
	}
	return stream.pipe(gulp.dest(modules === false ? esDir : libDir));
}

function dist(done) {
	rimraf.sync(getProjectPath('dist'));
	process.env.RUN_ENV = 'PRODUCTION';
	const webpackConfig = require(getProjectPath('webpack.config.js'));
	webpack(webpackConfig, (err, stats) => {
		if (err) {
			console.error(err.stack || err);
			if (err.details) {
				console.error(err.details);
			}
			return;
		}

		const info = stats.toJson();

		if (stats.hasErrors()) {
			console.error(info.errors);
		}

		if (stats.hasWarnings()) {
			console.warn(info.warnings);
		}

		const buildInfo = stats.toString({
			colors: true,
			children: true,
			chunks: false,
			modules: false,
			chunkModules: false,
			hash: false,
			version: false,
		});
		console.log(buildInfo);

		// Additional process of dist finalize
		const { dist: { finalize } = {} } = getConfig();
		if (finalize) {
			console.log('[Dist] Finalization...');
			finalize();
		}

		done(0);
	});
}


function compile(modules) {
	rimraf.sync(modules !== false ? libDir : esDir);

	const scss = gulp
		.src(['./src/components/**/*.scss'])
		.pipe(sass())
		.pipe(gulp.dest(modules === false ? esDir : libDir));

	const assets = gulp
		.src(['./src/assets/**/*.(png|svg)'])
		.pipe(gulp.dest(modules === false ? esDir : libDir));

	let error = 0;
	const source = [
		'./src/components/**/*.tsx',
		'./src/components/**/*.ts', './src/*',
		'./src/utils/*.ts',
		'./src/constants/*.ts',
		'./src/index.ts'
	];

	if (tsConfig.allowJs) {
		source.push('./src/components/**/*.jsx');
	}

	const tsResult = gulp.src(source).pipe(
		ts(tsConfig, {
			error(e) {
				tsDefaultReporter.error(e);
				error = 1;
			},
			finish: tsDefaultReporter.finish
		})
	);

	function check () {
		if (error && !argv['ignore-error']) {
			process.exit(1);
		}
	};

	tsResult.on('finish', check);
	tsResult.on('end', check);
	const tsFiesStream = babelify(tsResult, modules);
	const tsd = tsResult.dts.pipe(gulp.dest(modules === false ? esDir : libDir));

	return merge2([scss, tsFiesStream, tsd, assets]);
};

gulp.task(
	'dist',
	gulp.series(done => {
		dist(done);
	})
);

gulp.task('compile-with-es', done =>{
	console.log('[Parallel] Compile to es...');
	compile(false).on('finish', done);
});

gulp.task('compile-with-lib', done => {
	console.log('[Parallel] Compile to js...');
	compile().on('finish', done);
});

gulp.task('compile-finalize', done => {
	done();
});

gulp.task(
	'compile',
	gulp.series(gulp.parallel('compile-with-es', 'compile-with-lib'))
)
