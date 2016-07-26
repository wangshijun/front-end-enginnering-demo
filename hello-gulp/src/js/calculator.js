function Calculator() {
}

Calculator.prototype.sum = function () {
    if (arguments.length === 0) {
        return NaN;
    }

    var sum = 0;
    for (var i = 0, n = arguments.length; i < n; i++) {
        sum += arguments[i];
    }

    return sum;
};
