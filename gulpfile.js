var gulp = require('gulp');
var ext_replace = require('gulp-ext-replace');
var tslint = require('gulp-tslint');
var inlineNg2Template = require('gulp-inline-ng2-template');
/* CSS */
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var cssnano = require('cssnano');
var typescript = require('gulp-typescript');
var tsProject = typescript.createProject('tsconfig.json');

var paths = {
  src: {
    ts: './src/ts/**/*.ts',
    scss: './src/scss/app.scss'
  },
  dest: {
    js: './app/js',
    css: './app/css'
  }
};

gulp.task("tslint", function () {
    gulp.src([paths.src.ts])
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report());
});

gulp.task('build-ts', ["tslint", "build-css"], function () {
    return gulp.src(paths.src.ts)
        .pipe(inlineNg2Template())
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dest.js));
});

gulp.task('build-css', function () {
  return gulp.src(paths.src.scss)
    .pipe(sourcemaps.init())
    .pipe(postcss([precss, autoprefixer, cssnano]))
    .pipe(sourcemaps.write())
    .pipe(ext_replace('.css'))
    .pipe(gulp.dest(paths.dest.css));
});

gulp.task('watch', function () {
  gulp.watch(paths.src.ts, ['build-ts']);
  gulp.watch(paths.src.scss, ['build-css']);
});

gulp.task('default', ['watch', 'build-ts', 'build-css']);
