var expect = require('chai').expect;
var sum = require('../math').sum;

describe('math#sum()', function() {
    it('没有参数时正常表现', function () {
        expect(sum()).to.be.nan;
    });

    it('只有1个参数时正常表现', function () {
        expect(sum(1)).to.equal(1);
    });

    it('只有2个参数时正常表现', function () {
        expect(sum(1, 2)).to.equal(3);
    });

    it('有多个参数时正常表现', function () {
        expect(sum(1, 2, 3)).to.equal(6);
    });
});
