const gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    del = require('del'),
    log = require('./logger'),
    rename = require('gulp-rename'),
    stylus = require('gulp-stylus'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify');

////////////////////
// Error FUNCTION //
////////////////////
function displayError(error) {
    log(error.toString(), 'red');
    this.emit('end');
}
////////////
// Stylus //
////////////
gulp.task('stylus', () => {
    return gulp
        .src('./stylus/main.styl')
        .pipe(sourcemaps.init())
        .pipe(
            stylus({
                compress: true
            })
        )
        .on('error', displayError)
        .pipe(
            autoprefixer({
                browsers: ['last 2 versions'],
                cascade: true
            })
        )
        .pipe(rename('main.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css'))
        .on('end', () => {
            log('Stylus Compilado', 'green');
        });
});
////////////
// DEV JS //
////////////
gulp.task('js', function() {
    return gulp
        .src('./dev-js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .on('error', displayError)
        .pipe(concat('main.min.js'))
        .pipe(
            uglify({
                mangle: {
                    eval: true
                }
            })
        )
        .on('error', displayError)
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./js'))
        .on('end', () => {
            log('JS Compilado', 'yellow');
        });
});
////////////
// VENDORS//
////////////
gulp.task('vendors', function() {
    return gulp
        .src('./dev-js-vendors/**/*.js')
        .pipe(concat('vendors.min.js'))
        .pipe(gulp.dest('./js/vendors'))
        .on('end', () => {
            log('Vendors Concatenados', 'blue');
        });
});
//////////////
// WATCHERS //
//////////////
gulp.task('watchers', done => {
    log('Watchers Corriendo', 'yellow');
    gulp.watch('./stylus/**/*.styl', gulp.series('stylus'));
    gulp.watch('./dev-js/**/*.js', gulp.series('js'));
    gulp.watch('./dev-js-vendors/**/*.js', gulp.series('vendors'));
    done();
});

gulp.task(
    'dev',
    gulp.series('stylus', 'js', 'vendors', gulp.parallel('watchers'))
);
