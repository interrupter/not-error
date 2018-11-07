const expect = require('chai').expect,
	notError = require('../../build/error.cjs.js'),
	notErrorReporter = require('../../build/reporter.cjs.js');

describe("browser", function() {
	describe("common", function() {
		it("no options is passed", function() {
			let err = new notError('some error');
			expect(err.message).to.be.equal('some error');
			expect(err).to.be.instanceof(Error);
		});
	});
	describe("error", function() {
		it("no options is passed", function() {
			let err = new notError('some error');
			expect(err.message).to.be.equal('some error');
			expect(err).to.be.instanceof(Error);
		});
	});

	describe("reporter", function() {
		it('packError', function() {
			let err = new notError('some error', {i: 1});
			err.adopt(new Error('not same error'));
			let packed = notErrorReporter.packError(err);
			expect(packed.details.message).to.be.equal('some error');
			expect(packed.parent.message).to.be.equal('not same error');
			expect(packed.parent.name).to.be.equal('Error');
			expect(packed.options.i).to.be.equal(1);
		});

		it('getReportURL', function() {
			let URL = notErrorReporter.getReportURL();
			expect(URL).to.be.equal('/api/error');
		});
	});
});
