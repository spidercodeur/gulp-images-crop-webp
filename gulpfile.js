const { src , dest , series } = require('gulp');
const webp = require('gulp-webp');
const imageResize = require('gulp-image-resize');

function resize(cb) {

 src('src/img/**')
  .pipe(imageResize({
    width : 1200,
    height : 1200,
    crop : false,
    upscale : false,
    imageMagick:true
  }))
  .pipe(dest('dist/img/crop'))
  cb();
}

function webpconvert(cb){
 src('dist/img/crop/**')
  .pipe(webp({quality: 70}))
  .pipe(dest('dist/img/'))
  cb();
}


exports.default = series(resize, webpconvert);
