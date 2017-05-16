var gulp = require("gulp"),
  fs = require("fs"),
  path = require("path"),
  less = require("gulp-less");

gulp.task("less", function () {
    return gulp.src('./src/css/style.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest('./src/css'));
});

gulp.task('watch-less', function () {
    gulp.watch('./src/css/*.less', ['less']);
});