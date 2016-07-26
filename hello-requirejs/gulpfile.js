var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('js.seed', function () {
	gulp.src(['vendor/components/requirejs/require.js', 'vendor/components/jquery/dist/jquery.js'])
		.pipe(concat('seed.js'))
		.pipe(gulp.dest('src/js/'));
});
