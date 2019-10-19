var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var autoPrefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');

// LESS Plugins
var less = require('gulp-less');
var LessAutoPrefix = require('less-plugin-autoprefixer');
var lessAutoPrefix = new LessAutoPrefix();

var DIST_PATH = 'public/dist';
var SCRIPTS_PATH = 'public/scripts/**/*.js';
var CSS_PATH = 'public/css/**/*.css';
var LESS_PATH = 'public/less/styles.less';
var LESS_WATCH_PATH = 'public/less/**/*.less';

/*
gulp.task('styles', function(){
	console.log('Starting styles task');
	return gulp.src(['public/css/reset.css', CSS_PATH])
		.pipe(plumber(function (error) {
			console.log('Styles task error!');
			console.log(error);
			this.emit('end');
		}))
		.pipe(sourcemaps.init())
		.pipe(autoPrefixer())
		.pipe(concat('style.css'))
		.pipe(minifyCss())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());
});
*/

// LESS configuration
gulp.task('styles', function(){
	console.log('Starting styles task');
	return gulp.src(LESS_PATH)
		.pipe(plumber(function (error) {
			console.log('Styles task error!');
			console.log(error);
			this.emit('end');
		}))
		.pipe(sourcemaps.init())
		.pipe(less({
			plugins: [lessAutoPrefix]
		}))
		.pipe(minifyCss())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());
});

gulp.task('scripts', function(){
	console.log('Starting scripts task');
	return gulp.src(SCRIPTS_PATH)
		.pipe(uglify())
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());
});

gulp.task('images', function(){
	console.log('Starting images task');
});

gulp.task('default', function(){
	console.log('Starting default task');
});

gulp.task('watch', function() {
	console.log('Starting watch task!');
	require('./server.js');
	livereload.listen();
	return gulp.watch([SCRIPTS_PATH, LESS_WATCH_PATH], gulp.parallel('scripts', 'styles'));
});

