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

//scripts task will concat, minify and move scripts to dist
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

//styles task will compile SASS, minify the css, and move it to dist
gulp.task('styles', ['compileSass'], () => {
    gulp.src('styles/global.css')
        .pipe(cssNano())
        .pipe(rename('all.min.css'))
        .pipe(gulp.dest('dist/styles'));
});

//html will replace the non optimized scripts and styles
gulp.task('html', () => {
    gulp.src('index.html')
        .pipe(htmlReplace({
            css: 'styles/all.min.css',
            js: 'scripts/all.min.js'
        }))
        .pipe(gulp.dest('dist'));
});

//images task will optimize images and move them to dist
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

gulp.task('build', ['scripts', 'styles', 'images', 'icons', 'html'], () => {
    //start the server
    browserSync.init({
        server: 'dist'
    });
});

gulp.task('default', ['build']);