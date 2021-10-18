const expect = require('chai').expect,
	path = require('path'),
	pathToConfig = path.join(__dirname, 'config.json'),
	config = require('not-config'),
	notRequestError = require('../../index.js').notRequestError;

config.init(pathToConfig);

describe("node request error", function() {
	describe("common", function() {
		it("no options is passed", function() {
			let err = new notRequestError('some error');
			expect(err.message).to.be.equal('some error');
			expect(err.getCode()).to.be.equal(500);
			expect(err.getErrors()).to.be.deep.equal({});
			expect(err).to.be.instanceof(notRequestError);
		});
	});
	describe("node", function() {
		it("with code and errors messages", function() {
			const errors = {
				name: ['already_used'],
				email: ['not_working']
			};
			let err = new notRequestError(
				'some error',
				404,
				{
				...errors
				}
			);
			expect(err.message).to.be.equal('some error');
			expect(err.getCode()).to.be.equal(404);
			expect(err.getErrors()).to.be.deep.equal({...errors});
			expect(err).to.be.instanceof(notRequestError);
		});

		it("without code and errors messages, added after", function() {
			const errors = {
				name: ['already_used'],
				email: ['not_working']
			};
			let err = new notRequestError('some error');
			expect(err.message).to.be.equal('some error');
			expect(err.getErrors()).to.be.deep.equal({});
			expect(err.getCode()).to.be.deep.equal(500);
			err.setErrors(errors);
			expect(err.getErrors()).to.be.deep.equal({...errors});
			err.setCode(403);
			expect(err.getCode()).to.be.deep.equal(403);
			expect(err.getResult()).to.be.deep.equal({
				message:  'some error',
	      code:     403,
	      errors:   {...errors}
			});
			expect(err).to.be.instanceof(notRequestError);
		});

	});
});
