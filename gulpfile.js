var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var sass = require('gulp-sass');

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
        .pipe($.tslint({
            formatter: "verbose"
        }))
        .pipe($.tslint.report());
});

gulp.task('build-ts', ["tslint", "build-scss"], function () {
    return gulp.src(paths.src.ts)
        .pipe($.sourcemaps.init())
        .pipe($.typescript.createProject('tsconfig.json', {
            typescript: require('typescript')
        })())
        .pipe($.sourcemaps.write())
        .pipe($.inlineNg2Template())
        .pipe(gulp.dest(paths.dest.js));
});

gulp.task('build-scss', function () {
    return gulp.src(paths.src.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.dest.css));
});

gulp.task('watch', function () {
    gulp.watch(paths.src.ts, ['build-ts']);
    gulp.watch(paths.src.scss, ['build-scss']);
});

gulp.task('default', ['watch', 'build-ts', 'build-scss']);
