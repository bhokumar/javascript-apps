const { series, parallel, watch, src, dest} = require('gulp');
const uglify = require('gulp-uglify');
const cleanBuildDirectory = require('gulp-clean');

const BUILD_PATH = 'public/dist';
const SCRIPTS_PATH = 'public/scripts/**/*.js';

function clean(cb) {
  //return src(BUILD_PATH).pipe(cleanBuildDirectory());
  cb();
}

function cssTranspile(cb) {
  // body omitted
  cb();
}

function cssMinify(cb) {
  // body omitted
  cb();
}

function jsTranspile(cb) {
  // body omitted
  cb();
}

function jsBundle(cb) {
  // body omitted
  cb();
}

function jsMinify(cb) {
  // body 
  return src(SCRIPTS_PATH)
  		.pipe(uglify())
  		.pipe(dest(BUILD_PATH));
  cb();
}

function publish(cb) {
  // body omitted
  cb();
}

function watchFiles(callback) {
	watch(SCRIPTS_PATH)
	callback();
}

exports.build = series(
  clean,
  parallel(
    cssTranspile,
    series(jsTranspile, jsBundle)
  ),
  parallel(cssMinify, jsMinify),
  publish
);

exports.watch = series(
	watchFiles,
  parallel(
    cssTranspile,
    series(jsTranspile, jsBundle)
  ),
  parallel(cssMinify, jsMinify)
);

exports.clean = series(clean);


