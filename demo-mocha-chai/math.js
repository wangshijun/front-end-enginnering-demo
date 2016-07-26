module.exports = {
    /**
     * 把传过来的所有参数加起来
     */
    sum: function (num1, num2) {
        var sum = 0;
        for (var i = 0, n = arguments.length; i < n; i++) {
            sum += arguments[i];
        }
        return sum;
    },
};
