const expect = require('chai').expect,
	path = require('path'),
	pathToConfig = path.join(__dirname, 'config.json'),
	config = require('not-config'),
	notValidationError = require('../../index.js').notValidationError;

config.init(pathToConfig);

describe("node validation error", function() {
	describe("common", function() {
		it("no options is passed", function() {
			let err = new notValidationError('some error');
			expect(err.message).to.be.equal('some error');
			expect(err).to.be.instanceof(notValidationError);
		});
	});
	describe("node", function() {
		it("with errors messages", function() {
			const errors = {
				name: ['already_used'],
				email: ['not_working']
			};
			let err = new notValidationError('some error', {
				...errors
			}, null, {
				let: 'me',
				off: 1
			});
			expect(err.message).to.be.equal('some error');
			expect(err.getFieldsErrors()).to.be.deep.equal({...errors});
			expect(err).to.be.instanceof(notValidationError);
			expect(err.options.params).to.be.deep.equal({
				let: 'me',
				off: 1
			});
		});

		it("without errors messages, added after", function() {
			const errors = {
				name: ['already_used'],
				email: ['not_working']
			};
			let err = new notValidationError('some error');
			expect(err.message).to.be.equal('some error');
			expect(err.getFieldsErrors()).to.be.deep.equal({});
			err.setFieldsErrors(errors);
			expect(err.getFieldsErrors()).to.be.deep.equal({...errors});
			expect(err).to.be.instanceof(notValidationError);
		});

	});
});
