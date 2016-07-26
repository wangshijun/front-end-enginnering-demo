phantom.clearCookies();

casper.options.verbose = true;
casper.options.logLevel = 'info';

var userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36';
casper.userAgent(userAgent);

casper.options.viewportSize = { width: 1440, height: 900 };

casper.on('page.error', function (msg, trace) {
    this.echo('JSERROR: ' + msg, 'ERROR');
    for (var i = 0; i < trace.length; i++) {
        var step = trace[i];
        this.echo('   ' + step.file + ' (line ' + step.line + ')', 'ERROR');
    }
});

casper.test.begin('人人车首页', {
    setUp: function() {
    },

    tearDown: function() {
    },

    test: function(test) {
        casper.start('http://www.renrenche.com', function () {
            test.assertExists('#div_city', '城市切换区:正常');
            test.assertVisible('#div_city', '城市切换区:可见');
            test.assertNotVisible('#cities', '热门城市列表:默认不可见');

            this.mouseEvent('mouseover', '#div_city');
        });

        casper.then(function () {
            test.assertVisible('#cities', '热门城市列表:鼠标移入可见');
        });

        casper.run(function() {
            test.done();
        });
    },
});
