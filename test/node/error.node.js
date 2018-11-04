const expect = require('chai').expect,
	path = require('path'),
	pathToConfig = path.join(__dirname, 'config.json'),
	config = require('not-config'),
	notError = require('../../index.js');

config.init(pathToConfig);

describe("node error", function() {
	describe("common", function() {
		it("no options is passed", function() {
			let err = new notError('some error');
			expect(err.message).to.be.equal('some error');
			expect(err).to.be.instanceof(Error);
		});
	});
	describe("node", function() {
		it("no options is passed", function() {
			let err = new notError('some error');
			expect(err.message).to.be.equal('some error');
			expect(err).to.be.instanceof(Error);
		});

		it("whitelist is passed, with _ENV_NODE_", function() {
			let err = new notError('some error', {
				whitelist:['_ENV_NODE_']
			});
			expect(err.message).to.be.equal('some error');
			expect(err.env.vars).to.be.deep.equal({'_ENV_NODE_':'liquid'});
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

		it('getReportURL from not-config', function() {
			let err = new notError('some error'),
				URL = err.getReportURL();
			expect(URL).to.be.equal('/api/error');
		});

	});
});
