'use strict';

var querystring = require('querystring');

console.log(querystring.parse('?name=wangshijun&id=123&id=456&male'));

window.addEventListener('load', function () {
    document.querySelector('#js-refresh').addEventListener('click', function () {
        window.location.reload();
    });
});
