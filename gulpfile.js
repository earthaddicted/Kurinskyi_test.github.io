'use strict';

var gulp = require('gulp'),
    autoPrefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    imageMin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    sourceMaps = require('gulp-sourcemaps'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    server = require('gulp-server-livereload'),
    browserSync = require('browser-sync'),
    newer = require('gulp-newer');
    // ignore = require('gulp-ignore');

gulp.task('sass', function() {
    return gulp.src('source_files/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(sourceMaps.init({loadMaps: true}))
        .pipe(autoPrefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(rename('main.min.css'))
        .pipe(cleanCSS())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('www/css'))
        .pipe(browserSync.stream());
});

gulp.task('pages', function() {
    return gulp.src('source_files/**/*.html', { base: 'source_files/' })
        .pipe(gulp.dest('www'))
        .pipe(browserSync.stream());
});

gulp.task('images', function(){
    return gulp.src('source_files/img/**/*.{jpg,png,gif,svg}')
    	.pipe(newer('www/img/**'))
    	.pipe(imageMin())
        .pipe(gulp.dest('www/img'))
});

gulp.task('scripts', function() {
	return gulp.src(['source_files/js/*.js',
                    '!source_files/js/vanilla-tilt-es6.js',
                    '!source_files/js/common/*.js'])
        // .pipe(ignore.exclude('./source_files/js/bundle/*.js'))
        // .pipe(ignore.exclude('./source_files/js/es6/vanilla-tilt-es6.js'))
        // .pipe(ignore.exclude('source_files/js/vanilla-tilt-es6.js'))
		.pipe(uglify())
		.pipe(gulp.dest('www/js'))
        .pipe(browserSync.stream());
});

gulp.task('bundle-scripts', function() {
	return gulp.src('./source_files/js/common/*.js')
		.pipe(concat('bundle.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./www/js'))
        .pipe(browserSync.stream());
});

gulp.task('webserver', function() {
    gulp.src('www')
        .pipe(server({
            livereload: true,
            directoryListing: false,
            open: true,
            defaultFile: 'index1.html'
        }));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: 'www'
        },
        notify: false
    });

    gulp.watch('source_files/**/*.html', ['pages']);
    gulp.watch('source_files/scss/**/*.scss', ['sass']);
    gulp.watch('source_files/js/*.js', ['scripts']);
});

gulp.task('default', function() {
    gulp.start('pages', 'sass', 'scripts', 'bundle-scripts', 'browser-sync');
});
