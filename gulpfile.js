const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const runSequence = require('run-sequence');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const maps = require('gulp-sourcemaps');
const del = require('del');
const sass = require('gulp-sass');
const cssNano = require('gulp-cssnano');
const imageMin = require('gulp-imagemin');
const htmlReplace = require('gulp-html-replace');

gulp.task('concatScripts', () => {
    return gulp.src([
        'js/circle/autogrow.js', 
        'js/circle/circle.js'])
            .pipe(maps.init())
            .pipe(concat('global.js'))
            .pipe(maps.write('./'))
            .pipe(gulp.dest('js'));
});

gulp.task('scripts', ['concatScripts'], () => {
    gulp.src('js/global.js')
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('compileSass', () => {
    return gulp.src('sass/global.scss')
        .pipe(maps.init())
        .pipe(sass())
        .pipe(maps.write('./'))
        .pipe(gulp.dest('styles'));
});


gulp.task('styles', ['compileSass'], () => {
    return gulp.src('styles/global.css')
        .pipe(cssNano())
        .pipe(rename('all.min.css'))
        .pipe(gulp.dest('dist/styles'));
});

//ensure styles is complete before reloading the browsers
gulp.task('watchSass', ['styles'], (done) => {
    browserSync.reload();
    done();
});

//replace the non optimized scripts and styles
gulp.task('html', () => {
    gulp.src('index.html')
        .pipe(htmlReplace({
            css: 'styles/all.min.css',
            js: 'scripts/all.min.js'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
    gulp.src('images/*')
        .pipe(imageMin())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('icons', () => {
    gulp.src(['icons/**'])
        .pipe(gulp.dest('dist/icons'));
});

gulp.task("clean", () => {
    return del(['dist', 'dist/**', 'js/global*.js*', 'styles']);
});

//clean must run before the other tasks are ran
gulp.task('build', (done) => {
    return runSequence('clean', ['scripts', 'styles', 'images', 'icons', 'html'], done);
});

//wait for build to finish then launch the server
gulp.task('default', ['build'], () => {
    
    browserSync.init({
        server: 'dist'
    });

    gulp.watch(['sass/**/*.scss', 'sass/**/*.sass'], ['watchSass']);
});