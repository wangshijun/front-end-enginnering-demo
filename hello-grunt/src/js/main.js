(function () {
    'use strict';

    window.addEventListener('load', function () {
        document.querySelector('#js-refresh').addEventListener('click', function () {
            window.location.reload();
        });
    });
})();
