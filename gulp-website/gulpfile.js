var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var autoPrefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');

var DIST_PATH = 'public/dist';
var SCRIPTS_PATH = 'public/scripts/**/*.js';
var CSS_PATH = 'public/css/**/*.css';
var SCSS_PATH = 'public/scss/**/*.scss';

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
		.pipe(concat('styles.css'))
		.pipe(minifyCss())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());
});
*/


gulp.task('styles', function(){
	console.log('Starting styles task');
	return gulp.src('public/scss/styles.scss')
		.pipe(plumber(function (error) {
			console.log('Styles task error!');
			console.log(error);
			this.emit('end');
		}))
		.pipe(sourcemaps.init())
		.pipe(autoPrefixer())
		.pipe(sass({
			outputStyle: 'compressed'
		}))
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
	return gulp.watch([SCRIPTS_PATH, SCSS_PATH], gulp.parallel('scripts', 'styles'));
});

