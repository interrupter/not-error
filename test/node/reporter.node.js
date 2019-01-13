const expect = require('chai').expect,
	path = require('path'),
	http = require('http'),
	https = require('https'),
	pathToConfig = path.join(__dirname, 'config.json'),
	config = require('not-config'),
	notError = require('../../index.js').notError;

let notErrorReporter = require('../../index.js').notErrorReporter;

let configReader =  config.init(pathToConfig);
let NOT_NODE_ERROR_URL_NODE = process.env.NOT_NODE_ERROR_URL_NODE;
let NOT_NODE_ERROR_KEY = process.env.NOT_NODE_ERROR_KEY;
let config_key = configReader.get('modules:error:key');
let config_url = configReader.get('modules:error:url');
describe("node error reporter", function() {
	describe("node", function() {

		beforeEach(()=>{
			notErrorReporter.envFirst = false;
			process.env.NOT_NODE_ERROR_URL_NODE = NOT_NODE_ERROR_URL_NODE;
			process.env.NOT_NODE_ERROR_KEY = NOT_NODE_ERROR_KEY;
			configReader.set('modules:error:key',config_key);
			configReader.set('modules:error:url',config_url);
			configReader.set('modules:error:options', {
				"headers":{
					"X-HEADER-KEY": "fake ID"
				}
			});
		});

		it('set envFirst', function(){
			expect(notErrorReporter.envFirst).to.be.equal(false);
			notErrorReporter.useENV();
			expect(notErrorReporter.envFirst).to.be.equal(true);
		});

		it('selectProto as https from URL without options', function(){
			let mod = notErrorReporter.selectProto('https://location.defined');
			expect(mod).to.be.equal(https);
		})

		it('selectProto as https from URL with options secure=true', function(){
			let mod = notErrorReporter.selectProto('https://location.defined', {secure:true});
			expect(mod).to.be.equal(https);
		})

		it('selectProto as https from URL with options secure=false', function(){
			let mod = notErrorReporter.selectProto('https://location.defined', {secure:false});
			expect(mod).to.be.equal(https);
		})

		it('selectProto as https from URL with options secure=true, and http:// url', function(){
			let mod = notErrorReporter.selectProto('http://location.defined', {secure:true});
			expect(mod).to.be.equal(https);
		})

		it('selectProto as http from URL with options secure=false, and no proto part in url', function(){
			let mod = notErrorReporter.selectProto('/location/api', {secure:false});
			expect(mod).to.be.equal(http);
		})

		it('packError', function() {
			let err = new notError('some error', {i: 1});
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

		it('getReportURL from config with envFirst == true', function(){
			notErrorReporter.envFirst = true;
			process.env.NOT_NODE_ERROR_URL_NODE = '';
			let URL = notErrorReporter.getReportURL();
			expect(URL).to.be.equal('/api/error');
		});

		it('getReportURL from ENV with empty config and envFirst == false', function(){
			configReader.set('modules:error:url','');
			let URL = notErrorReporter.getReportURL();
			expect(URL).to.be.equal(process.env.NOT_NODE_ERROR_URL_NODE);
		});

		it('getReportURL from DEFAULT with empty config, envFirst == false, ENVs', function(){
			configReader.set('modules:error:url','');
			process.env.NOT_NODE_ERROR_URL_NODE = '';
			let URL = notErrorReporter.getReportURL();
			expect(URL).to.be.equal('/api/error');
		});

		it('getReportKey from not-config', function() {
			let TEST_KEY = 'test.key';
			configReader.set('modules:error:key', TEST_KEY);
			let KEY = notErrorReporter.getReportKey();
			expect(KEY).to.be.equal(TEST_KEY);
		});

		it('getReportKey from config with envFirst == true', function(){
			notErrorReporter.envFirst = true;
			let TEST_KEY = 'test.key';
			configReader.set('modules:error:key', TEST_KEY);
			process.env.NOT_NODE_ERROR_KEY = '';
			let KEY = notErrorReporter.getReportKey();
			expect(KEY).to.be.equal(TEST_KEY);
		});

		it('getReportKey from ENV with empty config and envFirst == false', function(){
			let KEY = notErrorReporter.getReportKey();
			expect(KEY).to.be.equal(process.env.NOT_NODE_ERROR_KEY);
		});

		it('getReportURL from DEFAULT with empty config, envFirst == false, ENVs', function(){
			configReader.set('modules:error:key','');
			process.env.NOT_NODE_ERROR_KEY = '';
			let KEY = notErrorReporter.getReportKey();
			expect(KEY).to.be.equal('');
		});

		it('reporting success', function(done) {
			let code = Math.random();
			configReader.set('modules:error:options', null);
			notErrorReporter.envFirst = true;
			notErrorReporter.report(new notError('Test node error', {code}), true)
				.then(async (response)=>{
					if(response && response.results && Array.isArray(response.results)){
						let data = response.results;
						if (data[0].options.code == code){
							done();
						}else{
							done(new Error('Validation code is wrong!'));
						}
					}else{
						done(new Error('No results in response'));
					}
				})
				.catch(done);
		});

		it('reporting failure - Invalid key', function(done) {
			notErrorReporter.envFirst = true;
			process.env.NOT_NODE_ERROR_KEY = '';
			notErrorReporter.report(new notError('Test node error'), true)
				.then((response)=>{
					done(new Error('Response is ok'));
				})
				.catch(async(err)=>{
					let res = JSON.parse(err.content);
					if(err.statusCode == 404 && res.message == 'Invalid key'){
						done();
					}else{
						done(err);
					}
				});
		});

		it('reporting failure - TypeError ERR_INVALID_DOMAIN_NAME', function(done) {
			notErrorReporter.envFirst = true;
			process.env.NOT_NODE_ERROR_URL_NODE = '';
			notErrorReporter.report(new notError('Test node error'), true)
				.then((response)=>{
					done(new Error('Response is ok'));
				})
				.catch((err)=>{
					if(err instanceof TypeError && err.name ==='TypeError [ERR_INVALID_DOMAIN_NAME]'){
						done();
					}
					else{	done(err);}
				});
		});

		it('reporting failure - TypeError ERR_INVALID_DOMAIN_NAME with notSecure==false', function(done) {
			notErrorReporter.envFirst = true;
			process.env.NOT_NODE_ERROR_URL_NODE = '';
			notErrorReporter.report(new notError('Test node error'), false)
				.then((response)=>{
					done(new Error('Response is ok'));
				})
				.catch((err)=>{
					if(err instanceof TypeError && err.name ==='TypeError [ERR_INVALID_DOMAIN_NAME]'){
						done();
					}
					else{	done(err);}
				});
		});
	});

	describe("node.standalone", function() {
		before(()=>{
			require('not-config').reader = null;
			require('not-config').readerForModule = null;
			delete require.cache[require.resolve('../../index.js')];
			delete require.cache[require.resolve('../../src/reporter.node.js')];

		});

		it('getReportURL from DEFAULT with empty config, envFirst == false, ENVs', function(){
			notErrorReporter = require('../../src/reporter.node.js');
			process.env.NOT_NODE_ERROR_URL_NODE = '';
			let URL = notErrorReporter.getReportURL();
			expect(URL).to.be.equal('/node/api');
		});

		it('getReportKey from DEFAULT with empty config, envFirst == false, ENVs', function(){
			notErrorReporter = require('../../src/reporter.node.js');
			process.env.NOT_NODE_ERROR_KEY = '';
			let KEY = notErrorReporter.getReportKey();
			expect(KEY).to.be.equal('test.key');
		});
	});
});
