$(document).ready(function () { console.log('dom ready'); });

if (Modernizr.video) {
    console.log('html5 video is supported');
} else {
    console.warn('html5 video is not supported');
}

if (Modernizr.cssgradients) {
    console.log('css3 gradients is supported');
} else {
    console.warn('css3 gradients is not supported');
}
