# Using Gulp to Build a Front End Website
In this project I set up a build process using gulp to prepare a front end website for deployment.

## How to use

* download or clone this repo and run ```npm install --dev``` to download the dependencies
* ```gulp styles``` will compile the project’s SCSS files into CSS, then concatenate and minify into an ```all.min.css``` file that is then copied to the ```dist/styles``` folder
* ```gulp scripts``` will concatenate, minify, and copy all of the project’s JavaScript files into an ```all.min.js``` file that is then copied to the    ```dist/scripts``` folder
* both ```gulp scripts``` and ```gulp styles``` will generate source maps
* ```gulp images``` will optimize the images and move them to the ```dist/content``` folder
* ```gulp clean``` will clean everything in ```dist```
* ```gulp build``` will run all of the build tasks with confidence that ```clean``` finishes before the other tasks
* default ```gulp``` command will run ```build``` and serve the files on a local web server