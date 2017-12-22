const expect = require("chai").expect,
	notError = require('../index.js');

describe("error", function() {
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
	});
});
