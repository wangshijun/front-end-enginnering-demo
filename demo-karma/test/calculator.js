
describe('Calculator', function () {

    before(function () {
        this.calculator = new Calculator();
    });

    describe('#sum', function () {
        it('should return nan with empty arguments', function () {
            expect(this.calculator.sum()).to.be.nan;
        });

        it('should return arg with 1 arguments', function () {
            expect(this.calculator.sum(1)).to.equal(1);
        });

        it('should return arg with 1 arguments', function () {
            expect(this.calculator.sum(-1)).to.equal(-1);
        });

        it('should return sum with 2 arguments', function () {
            expect(this.calculator.sum(-1, 1)).to.equal(0);
        });

    });

});
