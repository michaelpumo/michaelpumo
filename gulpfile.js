(function() {

    'use strict';

    var gulp = require('gulp'),
        plumber = require('gulp-plumber'),
        rename = require('gulp-rename'),
        autoprefixer = require('gulp-autoprefixer'),
        concat = require('gulp-concat'),
        uglify = require('gulp-uglify'),
        imagemin = require('gulp-imagemin'),
        cache = require('gulp-cache'),
        sass = require('gulp-sass'),
        browserSync = require('browser-sync').create(),
        svgmin = require('gulp-svgmin'),
        jade = require('gulp-jade'),
        browserify = require('browserify'),
        neat = require('node-neat').includePaths;

    gulp.task('browser-sync', function() {
        browserSync.init({
            server: {
                baseDir: './'
            },
            port: 8080
        });
    });

    gulp.task('bs-reload', function() {
        browserSync.reload();
    });

    gulp.task('images', function(){
        return gulp.src('src/images/**/*')
            .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
            .pipe(gulp.dest('dist/images/'));
    });

    gulp.task('svg', function () {
        return gulp.src(['src/svg/**', '!src/svg/{src,src/**}'])
            .pipe(svgmin())
            .pipe(gulp.dest('dist/svg/'));
    });

    gulp.task('styles', function() {
        return gulp.src(['src/css/**/*.scss'])
            .pipe(plumber({
                errorHandler: function(error) {
                    console.log(error);
                    this.emit('end');
                }
            }))
            .pipe(sass({ includePaths: neat, outputStyle: 'compressed' }))
            .pipe(autoprefixer('last 2 versions'))
            .pipe(gulp.dest('dist/css/'))
            .pipe(browserSync.reload({ stream: true }));
    });

    gulp.task('templates', function() {
        return gulp.src('src/jade/*.jade')
            .pipe(jade({
                pretty: '    '
            }))
            .pipe(gulp.dest('./'))
            .pipe(browserSync.reload({ stream: true }));
    });

    gulp.task('scripts', function(){
        return gulp.src(['src/js/plugins/**', 'src/js/app.js', '!src/js/{libraries,libraries/**}'])
            .pipe(plumber({
                errorHandler: function(error) {
                    console.log(error.message);
                    this.emit('end');
                }
            }))
            .pipe(concat('app.js'))
            .pipe(gulp.dest('dist/js/'))
            .pipe(rename({suffix: '.min'}))
            .pipe(uglify({preserveComments: 'some'}))
            .pipe(gulp.dest('dist/js/'))
            .pipe(browserSync.reload({ stream: true }));
    });

    gulp.task('default', ['browser-sync'], function(){
        gulp.watch('src/css/**/*.scss', ['styles']);
        gulp.watch('src/js/**/*.js', ['scripts']);
        gulp.watch('src/jade/**/*.jade', ['templates']);
        gulp.watch('*.html', ['bs-reload']);
    });

})();
