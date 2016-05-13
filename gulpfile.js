var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack-stream');
var named = require('vinyl-named');
var rename = require('gulp-rename');

gulp.task("default", () => {
  return gulp.src(['src/polyfills.ts', 'src/vendor.ts', 'src/app.ts'])
    .pipe(named())
    .pipe(webpack(require("./build/webpack.config")(true)))
    .pipe(rename((path) => {
      path.basename += ".bundle";
    }))
    .pipe(gulp.dest('dist/'));
});
