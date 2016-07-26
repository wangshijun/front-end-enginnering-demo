var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
	context: __dirname,
	devtool: debug ? "sourcemap" : null,
	entry: "./src/js/main.js",
	output: {
		path: __dirname + "/src/js",
		filename: "bundle.js"
	},
	plugins: debug ? [] : [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
	],
};
