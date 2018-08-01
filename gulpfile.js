//PROJECT OVERVIEW: 
    // The build process must fulfill the following criteria:

    // Concatenate and minify the JavaScript files
    // Compile SCSS into CSS in a concatenated and minified file
    // Generate JavaScript and CSS source maps
    // Compress any JPEG or PNG files
    // All output for the build process should be in a dist folder for distribution or deployment.

// Steps to Take: 
    //1) npm install should install all of the dependencies for the build process.

    //2)run the gulp scripts command at the command line to 
        //concatenate, minify, and copy all of the project’s JavaScript files into an all.min.js file that is then copied to the dist/scripts folder.

    //3)gulp styles command at the command line to compile the project’s 
        //SCSS files into CSS, then concatenate and minify into an all.min.css file that is then copied to the dist/styles folder.

    //4) gulp scripts or gulp styles commands at the command line, source maps are generated for the JavaScript and CSS files respectively.

    //5) gulp images command at the command line to optimize the size of the project’s
        // JPEG and PNG files, and then copy those optimized images to the dist/content folder.

    //6) I should be able to run the gulp clean command at the command line 
        //to delete all of the files and folders in the dist folder.

    //7) gulp build command at the command line to run the clean, scripts, 
        //styles, and images tasks with confidence that the clean task completes before the other commands.

    //8)should be able to run the gulp command at the command line to run the build task and serve my project using a local web server.

//By default, gulp-sourcemaps writes the source maps inline in the compiled CSS files. To write them to a separate file, specify a path
// relative to the gulp.dest() destination in the sourcemaps.write() function.

const gulp = require('gulp');
const uglify = require('gulp-uglify'); //for minifying JS files
const concat = require('gulp-concat'); //combine files
const rename = require('gulp-rename');
const maps = require('gulp-sourcemaps');
const del = require('del');
const sass = require('gulp-sass');
const cssNano = require('gulp-cssnano');
const imageMin = require('gulp-imagemin');

//sscripts
gulp.task('concatScripts', () => {
    return gulp.src([
        'js/circle/autogrow.js', 
        'js/circle/circle.js'])
            .pipe(maps.init())
            .pipe(concat('global.js'))
            .pipe(maps.write('./')) //same dir as global.js
            .pipe(gulp.dest('js'));
});


gulp.task('minifyScripts', ['concatScripts'], () => {
    return gulp.src('js/global.js')
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest('dist/scripts'));
});

//styles
//only need the globl.scss as source because it refers to all other sass files
gulp.task('compileSass', () => {
    return gulp.src('sass/global.scss')
        .pipe(maps.init())
        .pipe(sass())
        .pipe(maps.write('./'))
        .pipe(gulp.dest('styles'));
});

gulp.task('minifyCss', ['compileSass'], () => {
    return gulp.src('styles/global.css')
        .pipe(cssNano())
        .pipe(rename('all.min.css'))
        .pipe(gulp.dest('dist/styles'));
});

//images
gulp.task('minifyImages', () => {
    return gulp.src('images/*')
        .pipe(imageMin())
        .pipe(gulp.dest('dist/images'));
});

gulp.task("clean", () => {
    del(['dist', 'js/global*.js*', 'styles']);
});

// gulp build command at the command line to run the clean, scripts, 
//styles, and images tasks with confidence that the clean task completes before the other commands
//build should run clean, then run the scripts, styles and images tasks
gulp.task('build', ['minifyScripts', 'minifyCss', 'minifyImages']);

gulp.task('default', ['build'], () => {
    console.log('Build task done');
});