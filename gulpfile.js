const { src , dest , series, watch, lastRun } = require('gulp');

const clean = require('gulp-clean');
const imageResize = require('gulp-image-resize');
const webp = require('gulp-webp');

function resize(cb) {

return src('src/img/**',{ since: lastRun(resize) })
  .pipe(imageResize({
    width : 1920,
    height : 1200,
    crop : false,
    upscale : false,
    imageMagick:true
  }))
  .pipe(dest('dist/img/crop'))
  cb();
}

function convert(cb){
  return src('dist/img/crop/**',{ since: lastRun(convert) })
  .pipe(webp({quality: 80}))
  .pipe(dest('dist/img/'))
  cb();
}

function cleaner(cb){
  return src('dist/img/',{ allowEmpty: true })
  .pipe(clean())
  cb();
}

function watcher () {
  gulp.watch('img/**', resize)
}

exports.watch = function() {
  watch('src/img/**', series(resize, convert));
};
exports.default = series(cleaner, resize, convert);