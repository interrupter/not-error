const expect = require('chai').expect,
	notError = require('../../build/error.cjs.js'),
	notErrorReporter = require('../../build/reporter.cjs.js');

window.NOT_NODE_ERROR_KEY = 'error@reporter.local';
window.NOT_NODE_ERROR_URL_BROWSER = 'http://reporter.local/api/key/collect';

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
		it('packError', function(done) {
			let err = new notError('some error', {i: 1});
			err.adopt(new Error('not same error'));
			(new notErrorReporter()).packError(err)
				.then((packed)=>{
					expect(packed.details.message).to.be.equal('not same error');
					expect(packed.options.i).to.be.equal(1);
					done();
				})
				.catch(done);
		});

		it('getReportURL', function() {
			let URL = (new notErrorReporter()).getReportURL();
			expect(URL).to.be.equal(window.NOT_NODE_ERROR_URL_BROWSER);
		});

		it('reporting', function(done) {
			let code = Math.random();
			window.NOT_NODE_ERROR_URL_BROWSER = 'https://reporter.local/api/key/collect';
			(new notErrorReporter()).report(new notError('Test browser error', {code}))
				.then(async (response)=>{
					let data = await response.json();
					if (response.status == 200){
						console.log(JSON.stringify(data.results[0], null, 4));
						if(data.results[0].options.code == code){
							done();
						}else{
							done(new Error('Validation code is wrong!'));
						}
					}else{
						done(new Error(data.message));
					}
				})
				.catch(done);
		});
	});
});
