const expect = require('chai').expect,
	notError = require('../../build/error.cjs.js');

describe("browser", function() {
	describe("common", function() {
		it("no options is passed", function() {
			let err = new notError('some error');
			expect(err.message).to.be.equal('some error');
			expect(err).to.be.instanceof(Error);
		});
	});
	describe("browser", function() {
		it("no options is passed", function() {
			let err = new notError('some error');
			expect(err.message).to.be.equal('some error');
			expect(err).to.be.instanceof(Error);
		});

		it('packError', function() {
			let err = new notError('some error', {i: 1});
			err.adopt(new Error('not same error'));
			let packed = err.packError();
			expect(err.message).to.be.equal('some error');
			expect(packed.parent.message).to.be.equal('not same error');
			expect(packed.parent.name).to.be.equal('Error');
			expect(packed.options.i).to.be.equal(1);
		});

		it('getReportURL', function() {
			let err = new notError('some error'),
				URL = err.getReportURL();
			expect(URL).to.be.equal('/api/error');
		});
	});
});
