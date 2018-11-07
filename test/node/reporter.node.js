const expect = require('chai').expect,
	path = require('path'),
	pathToConfig = path.join(__dirname, 'config.json'),
	config = require('not-config'),
	notError = require('../../index.js').notError;
notErrorReporter = require('../../index.js').notErrorReporter;

config.init(pathToConfig);

describe("node error reporter", function() {
	describe("node", function() {
		it('packError', function() {
			let err = new notError('some error', {i:1});
			err.adopt(new Error('not same error'));
			let packed = notErrorReporter.packError(err);
			expect(packed.details.message).to.be.equal('some error');
			expect(packed.parent.message).to.be.equal('not same error');
			expect(packed.parent.name).to.be.equal('Error');
			expect(packed.options.i).to.be.equal(1);
		});

		it('getReportURL from not-config', function() {
			let URL = notErrorReporter.getReportURL();
			expect(URL).to.be.equal('/api/error');
		});

	});
});
