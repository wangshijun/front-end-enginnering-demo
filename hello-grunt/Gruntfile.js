var grunt = require('grunt');

module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: ['dist'],
		copy: {
			main: {
				files: [{ src: 'src/index.html', dest: 'dist/index.html' } ]
			},
		},
		imagemin: {
			images: {
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['images/*.{png,jpg,gif}'],
					dest: 'dist/'
				}]
			}
		},
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'src/css',
					src: ['*.css', '!*.min.css'],
					dest: 'dist/css',
					ext: '.min.css'
				}]
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'src/js/main.js',
				dest: 'dist/js/main.min.js'
			}
		},
		filerev: {
			options: {
				algorithm: 'md5',
				length: 8
			},
			images: {
				src: 'dist/images/*.*',
				dest: 'dist/images',
			},
			styles: {
				src: 'dist/css/*.min.css',
				dest: 'dist/css',
			},
			scripts: {
				src: 'dist/js/*.min.js',
				dest: 'dist/js',
			},
		},
	});

	grunt.registerTask('debugSummary', function () {
		console.log(require('util').inspect(grunt.filerev.summary));
	});

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', [
		'clean',
		'copy',
		'imagemin',
		'cssmin',
		'uglify',
		'filerev',
		'debugSummary'
	]);

};
