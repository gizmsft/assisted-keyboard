const { src, dest } = require('gulp');
const sassPlugin = require('gulp-sass')(require('sass'));
const uglifyPlugin = require('gulp-uglify');
const renamePlugin = require('gulp-rename');
const minifyCssPlugin = require('gulp-clean-css');
const concatPlugin = require('gulp-concat');

var copyCssTask = function (callback) {
    src('./css/*.css')
        .pipe(dest('./dist/css'));

    callback();
}

var copyJsTask = function (callback) {
    src([
        'node_modules/ajax-call-synchronizer/dist/js/ajax-call-synchronizer.min.js',
        'node_modules/auto-complete/dist/js/auto-complete.js',
        'lib/on-screen-keyboard.js',
        'lib/assisted-keyboard.js'])
        .pipe(concatPlugin('assisted-keyboard.js'))
        .pipe(dest('./dist/js'));

    callback();
}

var minifyCssTask = function (callback) {
    src('./css/*.css')
        .pipe(sassPlugin())
        .pipe(minifyCssPlugin())
        .pipe(renamePlugin(function (path) {
            path.basename += '.min';
        }))
        .pipe(dest('./dist/css'));

    callback();
}

var minifyJsTask = function (callback) {
    src([
        'node_modules/ajax-call-synchronizer/dist/js/ajax-call-synchronizer.min.js',
        'node_modules/auto-complete/dist/js/auto-complete.js',
        'lib/on-screen-keyboard.js',
        'lib/assisted-keyboard.js'])
        .pipe(uglifyPlugin())
        .pipe(concatPlugin('assisted-keyboard.min.js'))
        .pipe(dest('./dist/js'));

    callback();
}

var defaultTask = function (callback) {
    copyCssTask(callback);
    copyJsTask(callback);
    minifyCssTask(callback);
    minifyJsTask(callback);

    callback();
}

exports.copyCss = copyCssTask;
exports.copyJs = copyJsTask;
exports.minifyCss = minifyCssTask;
exports.minifyJs = minifyJsTask;
exports.default = defaultTask;