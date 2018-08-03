//7) gulp build command at the command line to run the clean, scripts, 
//styles, and images tasks with confidence that the clean task completes before the other commands.

//8)should be able to run the gulp command at the command line to run the build task and serve my project using a local web server.

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const maps = require('gulp-sourcemaps');
const del = require('del');
const sass = require('gulp-sass');
const cssNano = require('gulp-cssnano');
const imageMin = require('gulp-imagemin');

//SCRIPTS
gulp.task('concatScripts', () => {
    return gulp.src([
        'js/circle/autogrow.js', 
        'js/circle/circle.js'])
            .pipe(maps.init())
            .pipe(concat('global.js'))
            .pipe(maps.write('./'))
            .pipe(gulp.dest('js'));
});

gulp.task('minifyScripts', ['concatScripts'], () => {
    gulp.src('js/global.js')
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('scripts', ['minifyScripts']);

//STYLES
gulp.task('compileSass', () => {
    return gulp.src('sass/global.scss')
        .pipe(maps.init())
        .pipe(sass())
        .pipe(maps.write('./'))
        .pipe(gulp.dest('styles'));
});

gulp.task('minifyStyles', ['compileSass'], () => {
    gulp.src('styles/global.css')
        .pipe(cssNano())
        .pipe(rename('all.min.css'))
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('styles', ['minifyStyles']);

//IMAGES
gulp.task('images', () => {
    gulp.src('images/*')
        .pipe(imageMin())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('icons', () => {
    gulp.src(['icons/**'])
        .pipe(gulp.dest('dist/icons'));
})


gulp.task("clean", () => {
    del(['dist', 'js/global*.js*', 'styles']);
});

gulp.task('build', ['scripts', 'styles', 'images', 'icons'], () => {
    gulp.src(['index.html'])
    .pipe(gulp.dest('dist'));

    //start the server
    browserSync.init({
        server: 'dist'
    });
});

gulp.task('default', ['build']);