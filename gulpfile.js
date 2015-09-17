(function() {

    'use strict';

    var gulp            = require('gulp'),
        plumber         = require('gulp-plumber'),
        rename          = require('gulp-rename'),
        sourcemaps      = require('gulp-sourcemaps'),
        postcss         = require('gulp-postcss'),
        autoprefixer    = require('autoprefixer-core'),
        uglify          = require('gulp-uglify'),
        imagemin        = require('gulp-imagemin'),
        cache           = require('gulp-cache'),
        sass            = require('gulp-sass'),
        browserSync     = require('browser-sync').create(),
        svgmin          = require('gulp-svgmin'),
        jade            = require('gulp-jade'),
        browserify      = require('browserify'),
        source          = require('vinyl-source-stream'),
        streamify       = require('gulp-streamify'),
        neat            = require('node-neat').includePaths;

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

    gulp.task('files', function(){
        return gulp.src('src/files/**/*')
            .pipe(gulp.dest('dist/files/'))
            .pipe(browserSync.reload({ stream: true }));
    });

    gulp.task('images', function(){
        return gulp.src('src/images/**/*')
            .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
            .pipe(gulp.dest('dist/images/'))
            .pipe(browserSync.reload({ stream: true }));
    });

    gulp.task('svg', function () {
        return gulp.src(['src/svg/**', '!src/svg/{src,src/**}'])
            .pipe(svgmin())
            .pipe(gulp.dest('dist/svg/'))
            .pipe(browserSync.reload({ stream: true }));
    });

    gulp.task('styles', function() {
        return gulp.src(['src/scss/**/*.scss'])
            .pipe(plumber({
                errorHandler: function(error) {
                    console.log(error);
                    this.emit('end');
                }
            }))
            .pipe(sass({ includePaths: neat, outputStyle: 'compressed' }))
            .pipe(sourcemaps.init())
            .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('dist/css/'))
            .pipe(browserSync.reload({ stream: true }));
    });

    gulp.task('templates', function() {
        return gulp.src('src/jade/*.jade')
            .pipe(plumber({
                errorHandler: function(error) {
                    console.log(error.message);
                    this.emit('end');
                }
            }))
            .pipe(jade({
                pretty: '    '
            }))
            .pipe(gulp.dest('./'))
            .pipe(browserSync.reload({ stream: true }));
    });

    gulp.task('scripts', function(){
        return browserify('src/js/app.js', { debug: true })
            .bundle()
            .pipe(source('app.js'))
            .pipe(gulp.dest('dist/js/'))
            .pipe(rename({ suffix: '.min' }))
            .pipe(streamify(uglify({ preserveComments: 'some' })))
            .pipe(gulp.dest('dist/js/'))
            .pipe(browserSync.reload({ stream: true }));
    });

    gulp.task('default', ['browser-sync'], function(){
        gulp.watch('src/scss/**/*.scss', ['styles']);
        gulp.watch('src/js/**/*.js', ['scripts']);
        gulp.watch('src/jade/**/*.jade', ['templates']);
        gulp.watch('*.html', ['bs-reload']);
    });

})();
