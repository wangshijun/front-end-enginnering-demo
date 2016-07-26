'use strict';

require('./module1.js');
require('./module2.js');

var $ = require('jquery');

$(function () {
	$('#js-refresh').on('click', function () {
		console.log('refresh clicked!');
        window.location.reload();
	});
});

