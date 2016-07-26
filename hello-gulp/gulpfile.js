var gulp = require('gulp');
var print = require('gulp-print');
var fs = require('fs');

gulp.task('default', ['dev', 'dev2']);

gulp.task('dev', function () {
    console.log('hello gulp dev');
});

gulp.task('dev2', function () {
    console.log('hello gulp dev2');
});

gulp.task('async', function (done) {
    fs.readFile('./src/js/calculator.js', function (err, content) {
        if (err) {
            console.error(err);
        } else {
            console.log(content.toString());
        }

        done();
    });
});

// gulp.src, gulp.dest
gulp.task('copy', function () {
    gulp.src(['src/**/*'])
        .pipe(print())
        .pipe(gulp.dest('dist'));
});

