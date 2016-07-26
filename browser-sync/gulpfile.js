var gulp = require('gulp');
var $ = require('gulp-load-plugins')(gulp);
var sequence = require('run-sequence');
var pngquant = require('imagemin-pngquant');
var browserSync = require('browser-sync').create();

gulp.task('default', function () {
    browserSync.init({
        server: {
            baseDir: "./src/"
        }
    });

    gulp.watch(['src/*.html', 'src/css/*.css', 'src/js/*.js', 'src/images/*.*']).on('change', browserSync.reload);
});

gulp.task('imagemin', function () {
    return gulp.src('src/images/*.*')
        .pipe($.debug({ title: 'imagemin' }))
        .pipe($.imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe($.rev())
        .pipe(gulp.dest('dist/images'))
        .pipe($.rev.manifest())
        .pipe(gulp.dest('dist/rev/images'));
});

gulp.task('cssmin', function () {
    return gulp.src(['src/css/*.css', 'dist/rev/images/*.json'])
        .pipe($.debug({ title: 'cssmin' }))
        .pipe($.revCollector({ replaceReved: true }))
        .pipe($.minifyCss())
        .pipe($.rev())
        .pipe(gulp.dest('dist/css/'))
        .pipe($.rev.manifest())
        .pipe(gulp.dest('dist/rev/css'));
});

gulp.task('jsmin', function () {
    return gulp.src(['src/js/*.js', 'dist/rev/images/*.json', 'dist/rev/css/*.json'])
        .pipe($.debug({ title: 'jsmin' }))
        .pipe($.revCollector({ replaceReved: true }))
        .pipe($.uglify())
        .pipe($.rev())
        .pipe(gulp.dest('dist/js/'))
        .pipe($.rev.manifest())
        .pipe(gulp.dest('dist/rev/js'));
});

gulp.task('htmlmin', function () {
    return gulp.src(['src/index.html', 'dist/rev/images/*.json', 'dist/rev/css/*.json', 'dist/rev/js/*.json'])
        .pipe($.debug({ title: 'htmlmin' }))
        .pipe($.revCollector({ replaceReved: true }))
        .pipe($.minifyHtml())
        .pipe(gulp.dest('dist/'));
});

gulp.task('build', function (done) {
    sequence('imagemin', 'cssmin', 'jsmin', 'htmlmin', done);
});

