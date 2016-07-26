define('modules/mod1', ['jquery'], function ($) {
	return {
		sayHello: function () {
			$('body').append('<p>Hello from mod1</p>');
		}
	};
});
