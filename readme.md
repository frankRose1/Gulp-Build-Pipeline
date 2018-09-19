# Using Gulp to Build a Front End Website
In this project I set up a build process using gulp to prepare a front end website for deployment. The website itself is very simple, this project was more about getting practice using Gulp.
The main objective was to optimize the necessary files needed for deployment, and to launch a local web server that will host the website.
As an added feature I added a ```watch``` task to watch the sass files for any changes and reload the browser when the file is saved.

## How To Use

* download or clone this repo and run ```npm install``` to download the dependencies
* ```gulp styles``` will compile the project’s SCSS files into CSS, then concatenate and minify into an ```all.min.css``` file that is then copied to the ```dist/styles``` folder
* ```gulp scripts``` will concatenate, minify, and copy all of the project’s JavaScript files into an ```all.min.js``` file that is then copied to the    ```dist/scripts``` folder
* both ```gulp scripts``` and ```gulp styles``` will generate source maps
* ```gulp images``` will optimize the images and move them to the ```dist/content``` folder
* ```gulp clean``` will clean everything in ```dist```
* ```gulp build``` will run all of the build tasks with confidence that ```clean``` finishes before the other tasks
* default ```gulp``` command will run ```build``` and serve the files on a local web server

## Built With 

* [gulp](https://www.npmjs.com/package/gulp) - as a build tool
* [browser-sync](https://www.browsersync.io/docs/gulp/) - to serve the files
* [run-sequence](https://www.npmjs.com/package/run-sequence) - run tasks in order
* [gulp-uglify](https://www.npmjs.com/package/gulp-uglify) - minify the scripts
* [gulp-concat](https://www.npmjs.com/package/gulp-concat) - combine files
* [gulp-rename](https://www.npmjs.com/package/gulp-rename) - rename files
* [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) - generate source maps
* [gulp-sass](https://www.npmjs.com/package/gulp-sass) - compile sass to css
* [gulp-cssnano](https://www.npmjs.com/package/gulp-cssnano) - minify css
* [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) - optimize images
* [gulp-html-replace](https://www.npmjs.com/package/gulp-html-replace) - replace build blocks in html
* [del](https://www.npmjs.com/package/del) - remove files & directories